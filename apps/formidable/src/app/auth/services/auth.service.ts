import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, shareReplay, take, tap } from 'rxjs/operators';
import {
  ILoginRequestData,
  ILoginResponseData,
  IRefreshTokenResponseData,
  IRegisterRequestData,
} from '../models/auth-models';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { environment } from '@formidable/env';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class AuthService
{
  private _refreshTokenTimeout: number;
  private readonly _userSubject = new BehaviorSubject<IUser | null>(null);
  private readonly _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  readonly user = this._userSubject.asObservable();

  constructor(
    private readonly _http: HttpClient,
    private readonly _tokenService: TokenService,
    private readonly _router: Router,
    private readonly _logger: NGXLogger
  ) {}

  private _handleError(error: HttpErrorResponse)
  {
    this._logger.error('Auth error', error);
    return throwError(error);
  }

  login(data: ILoginRequestData): Observable<ILoginResponseData>
  {
    this._tokenService.removeTokens();

    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this._http.post<ILoginResponseData>(`${Api.authUrl}/login/`, body).pipe(
      tap(res =>
      {
        this._tokenService.rawToken = res.access_token;
        this._tokenService.rawRefreshToken = res.refresh_token;
        this._userSubject.next(res.user);
        this._startRefreshTokenTimer();
      }),
      shareReplay(),
      catchError(err => this._handleError(err))
    );
  }

  refreshToken(): Observable<IRefreshTokenResponseData>
  {
    this._tokenService.removeToken();

    const refreshToken = this._tokenService.rawRefreshToken || '';
    const body = new HttpParams().set('refresh', refreshToken);
    const url = Api.tokenUrl + '/refresh/';
    const options = { ...this._httpOptions };

    return this._http.post<IRefreshTokenResponseData>(url, body, options).pipe(
      tap(res =>
      {
        this._tokenService.rawToken = res.access;
        this._startRefreshTokenTimer();
      }),
      shareReplay(),
      catchError(err => this._handleError(err))
    );
  }

  logout(): void
  {
    this._tokenService.removeTokens();
    this._stopRefreshTokenTimer();

    this._http.post(`${Api.authUrl}/logout/`, {})
      .pipe(take(1), shareReplay())
      .subscribe();

    void this._router.navigate(['auth', 'login']);
  }

  register(data: IRegisterRequestData): Observable<IRegisterRequestData>
  {
    return this._http
      .post<IRegisterRequestData>(`${Api.authUrl}/registration/`, data)
      .pipe(shareReplay(), catchError(err => this._handleError(err)));
  }

  verifyToken(): Observable<IRefreshTokenResponseData>
  {
    const body = { token: this._tokenService.rawToken };
    const url = `${Api.tokenUrl}/verify/`;
    const options = { withCredentials: true };

    return this._http.post<IRefreshTokenResponseData>(url, body, options)
      .pipe(shareReplay(), catchError(err => this._handleError(err)));
  }

  isLoggedIn(): boolean
  {
    return !!this._tokenService.rawRefreshToken;
  }

  private _startRefreshTokenTimer(): void
  {
    if (!this._tokenService.token) return this._logger.debug('Not token on timer start');

    const expires = new Date(this._tokenService.token?.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;

    this._logger.debug('Start refresh token timer with timeout: ', timeout);

    this._refreshTokenTimeout = setTimeout(
      () => this.refreshToken().pipe(take(1)).subscribe(),
      timeout
    );
  }

  private _stopRefreshTokenTimer(): void
  {
    this._logger.debug('Stop refresh token timer');
    clearTimeout(this._refreshTokenTimeout);
  }
}

class Api
{
  static get authUrl(): string
  {
    return environment.apiUrl + 'auth';
  }

  static get tokenUrl(): string
  {
    return environment.apiUrl + 'token';
  }
}

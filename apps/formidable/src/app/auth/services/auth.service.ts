import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import {
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
  IRegisterRequest
} from '../models/auth-models';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { environment } from '@formidable/env';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private _refreshTokenTimeout: number;
  private readonly _userSubject = new BehaviorSubject<IUser | null>(null);
  private readonly _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  readonly user = this._userSubject.asObservable();

  constructor(
    private readonly _http: HttpClient,
    private readonly _tokenService: TokenService,
    private readonly _router: Router,
    private readonly _logger: NGXLogger
  )
  {
  }

  login(data: ILoginRequest): Observable<ILoginResponse>
  {
    this._tokenService.removeTokens();

    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this._http.post<ILoginResponse>(`${Api.authUrl}/login/`, body).pipe(
      tap(res =>
      {
        this._tokenService.rawToken = res.access_token;
        this._tokenService.rawRefreshToken = res.refresh_token;
        this._userSubject.next(res.user);
        this._startRefreshTokenTimer();
      })
    );
  }

  refreshToken(): Observable<IRefreshTokenResponse>
  {
    this._tokenService.removeToken();

    const refreshToken = this._tokenService.rawRefreshToken || '';
    const body = new HttpParams().set('refresh', refreshToken);
    const url = Api.tokenUrl + '/refresh/';
    const options = { ...this._httpOptions };

    return this._http.post<IRefreshTokenResponse>(url, body, options).pipe(
      tap(res =>
      {
        this._tokenService.rawToken = res.access;
        this._startRefreshTokenTimer();
      }),
      catchError(err =>
      {
        this.logout();
        return throwError(err);
      })
    );
  }

  logout(): void
  {
    this._tokenService.removeTokens();
    this._stopRefreshTokenTimer();

    this._http.post(`${Api.authUrl}/logout/`, {}).pipe(take(1)).subscribe();

    void this._router.navigate(['auth', 'login']);
  }

  register(data: IRegisterRequest): Observable<IRegisterRequest>
  {
    return this._http.post<IRegisterRequest>(`${Api.authUrl}/registration/`, data);
  }

  verifyToken(): Observable<IRefreshTokenResponse>
  {
    const body = { token: this._tokenService.rawToken };
    const url = `${Api.tokenUrl}/verify/`;
    const options = { withCredentials: true };

    return this._http.post<IRefreshTokenResponse>(url, body, options);
  }

  isLoggedIn(): boolean
  {
    return !!this._tokenService.rawRefreshToken;
  }

  private _startRefreshTokenTimer(): void
  {
    if (!this._tokenService.token) return this._logger.debug('No token on timer start');

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
    return Api.authUrl + '/token';
  }
}

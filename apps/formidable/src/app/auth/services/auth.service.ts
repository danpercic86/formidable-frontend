import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { IUser } from '../models/user';
import {
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
  IRegisterRequest,
} from '../models/auth-models';
import { TokenService } from './token.service';
import { Api } from '../utils/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _refreshTokenTimeout?: number;
  private readonly _user$ = new BehaviorSubject<IUser | null>(null);
  readonly user$ = this._user$.asObservable();

  private readonly _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router,
    private readonly _logger: NGXLogger,
  ) {}

  get isLoggedIn(): boolean {
    return !!this._user$.getValue();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  login(data: ILoginRequest): Observable<ILoginResponse> {
    TokenService.removeTokens();

    const body = new HttpParams().set('email', data.email).set('password', data.password);

    return this._http.post<ILoginResponse>(`${Api.authUrl}/login/`, body).pipe(
      tap(res => {
        TokenService.rawToken = res.access_token;
        TokenService.rawRefreshToken = res.refresh_token;
        this._user$.next(res.user);
        this._startRefreshTokenTimer();
      }),
    );
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    TokenService.removeToken();

    const refreshToken = TokenService.rawRefreshToken || '';
    const body = new HttpParams().set('refresh', refreshToken);
    const url = `${Api.tokenUrl}/refresh/`;
    const options = { ...this._httpOptions };

    return this._http.post<IRefreshTokenResponse>(url, body, options).pipe(
      tap(res => {
        TokenService.rawToken = res.access;
        this._startRefreshTokenTimer();
      }),
      catchError(err => {
        this.logout();
        // eslint-disable-next-line no-console
        return throwError(() => console.log(err));
      }),
    );
  }

  logout(): void {
    TokenService.removeTokens();
    this._stopRefreshTokenTimer();
    this._user$.next(null);

    this._http.post(`${Api.authUrl}/logout/`, {}).pipe(take(1)).subscribe();

    if (['/home', '/auth'].includes(this._router.url))
      // eslint-disable-next-line no-void
      void this._router.navigate(['/auth/login']).then();
  }

  register(data: IRegisterRequest): Observable<IRegisterRequest> {
    return this._http.post<IRegisterRequest>(`${Api.authUrl}/registration/`, data);
  }

  verifyToken(): Observable<IRefreshTokenResponse> {
    const body = { token: TokenService.rawToken };
    const url = `${Api.tokenUrl}/verify/`;
    const options = { withCredentials: true };

    return this._http.post<IRefreshTokenResponse>(url, body, options);
  }

  private _startRefreshTokenTimer(): void {
    if (!TokenService.token) return this._logger.debug('No token on timer start');

    const expires = new Date(TokenService.token?.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;

    this._refreshTokenTimeout = window.setTimeout(
      () => this.refreshToken().pipe(take(1)).subscribe(),
      timeout,
    );
    return this._logger.debug('Start refresh token timer with timeout: ', timeout);
  }

  private _stopRefreshTokenTimer(): void {
    this._logger.debug('Stop refresh token timer');
    clearTimeout(this._refreshTokenTimeout);
  }
}

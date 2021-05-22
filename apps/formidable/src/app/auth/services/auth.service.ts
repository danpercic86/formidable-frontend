import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import {
  ILoginRequestData,
  ILoginResponseData,
  IRefreshTokenResponseData,
  IRegisterRequestData
} from '../models/auth-models';
import { Router } from '@angular/router';

const API_URL = '/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  redirectUrl: string;

  private _refreshTokenTimeout: number;

  get authOptions(): { headers: HttpHeaders }
  {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + (this._tokenService.rawToken as string)
      })
    };
  }

  constructor(
    private readonly _http: HttpClient,
    private readonly _tokenService: TokenService,
    private readonly _router: Router
  )
  {
  }

  private static _handleError(error: HttpErrorResponse)
  {
    console.log('ERROR');
    console.log(error);
    return throwError(error);
  }

  login(data: ILoginRequestData): Observable<ILoginResponseData>
  {
    this._tokenService.removeTokens();

    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    const url = API_URL + 'login/';
    const options = { withCredentials: true };

    return this._http.post<ILoginResponseData>(url, body, options).pipe(
      tap(res =>
      {
        this._tokenService.rawToken = res.access_token;
        this._tokenService.rawRefreshToken = res.refresh_token;
        this._startRefreshTokenTimer();
      }),
      catchError(AuthService._handleError)
    );
  }

  refreshToken(): Observable<IRefreshTokenResponseData>
  {
    const refreshToken = this._tokenService.rawRefreshToken || '';
    this._tokenService.removeTokens();
    const body = new HttpParams().set('refresh', refreshToken);
    const url = API_URL + 'token/refresh/';
    const options = { ...this.authOptions, withCredentials: true };

    return this._http.post<IRefreshTokenResponseData>(url, body, options).pipe(
      tap(res =>
      {
        this._tokenService.rawToken = res.access;
        this._tokenService.rawRefreshToken = res.access;
        this._startRefreshTokenTimer();
      }),
      catchError(AuthService._handleError)
    );
  }

  logout(): Promise<boolean>
  {
    this._tokenService.removeTokens();
    this._stopRefreshTokenTimer();

    const url = API_URL + 'logout/';
    const options = { withCredentials: true };
    this._http.post(url, {}, options).pipe(take(1)).subscribe();

    return this._router.navigate(['/login']);
  }

  register(data: IRegisterRequestData): Observable<IRegisterRequestData>
  {
    const url = API_URL + 'registration/';
    const options = { withCredentials: true };

    return this._http.post<IRegisterRequestData>(url, data, options)
      .pipe(catchError(AuthService._handleError));
  }

  verifyToken(): Observable<IRefreshTokenResponseData>
  {
    const body = { token: this._tokenService.rawToken };
    const url = API_URL + 'token/verify/';
    const options = { withCredentials: true };

    return this._http.post<IRefreshTokenResponseData>(url, body, options)
      .pipe(catchError(AuthService._handleError));
  }

  isLoggedIn(): boolean
  {
    return !!this._tokenService.rawRefreshToken;
  }

  private _startRefreshTokenTimer(): void
  {
    if (!this._tokenService.token) return;
    const expires = new Date(this._tokenService.token?.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this._refreshTokenTimeout = setTimeout(
      () => this.refreshToken().pipe(take(1)).subscribe(),
      timeout
    );
  }

  private _stopRefreshTokenTimer(): void
  {
    clearTimeout(this._refreshTokenTimeout);
  }
}

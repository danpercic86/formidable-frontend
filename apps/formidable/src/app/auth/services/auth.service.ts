import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  ILoginRequestData,
  ILoginResponseData,
  IRefreshTokenRequestData,
  IRefreshTokenResponseData,
  IRegisterRequestData,
} from '../models/auth-models';
import { Router } from '@angular/router';

const API_URL = '/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService
{
  redirectUrl: string;
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this._tokenService.token,
    }),
  };

  constructor(
    private readonly _http: HttpClient,
    private readonly _tokenService: TokenService,
    private readonly _router: Router
  ) {}

  private static _handleError(error: HttpErrorResponse)
  {
    if (error.error instanceof ErrorEvent)
    {
      console.error('An error occurred:', error.error.message);
    }
    else
    {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  private static _log(message: string): void
  {
    console.log(message);
  }

  login(data: ILoginRequestData): Observable<ILoginResponseData>
  {
    this._tokenService.removeTokens();

    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this._http.post<ILoginResponseData>(API_URL + 'login/', body).pipe(
      tap(res =>
      {
        this._tokenService.token = res.access_token;
        this._tokenService.refreshToken = res.refresh_token;
      }),
      catchError(AuthService._handleError)
    );
  }

  refreshToken(data: IRefreshTokenRequestData): Observable<IRefreshTokenResponseData>
  {
    this._tokenService.removeToken();
    this._tokenService.removeRefreshToken();
    const body = new HttpParams().set('refresh', data.refresh);
    return this._http
      .post<IRefreshTokenResponseData>(
        API_URL + 'token/refresh/',
        body,
        this._httpOptions
      )
      .pipe(
        tap(res =>
        {
          this._tokenService.token = res.access;
          this._tokenService.refreshToken = res.access;
        }),
        catchError(AuthService._handleError)
      );
  }

  logout(): Observable<unknown>
  {
    this._tokenService.removeTokens();
    return this._http.post(API_URL + 'logout/', {});
  }

  register(data: IRegisterRequestData): Observable<IRegisterRequestData>
  {
    return this._http.post<IRegisterRequestData>(API_URL + 'registration/', data).pipe(
      tap(() => AuthService._log('register')),
      catchError(AuthService._handleError)
    );
  }

  verifyToken(): Observable<IRefreshTokenResponseData>
  {
    const body = { token: this._tokenService.token };
    return this._http
      .post<IRefreshTokenResponseData>(API_URL + 'token/verify/', body)
      .pipe(catchError(AuthService._handleError));
  }

  toLogin(): void
  {
    void this._router.navigate(['/auth/login']);
  }

  toRegister(): void
  {
    void this._router.navigate(['/auth/register']);
  }
}

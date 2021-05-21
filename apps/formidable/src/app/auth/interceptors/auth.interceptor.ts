import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
  constructor(
    private readonly _router: Router,
    private readonly _tokenService: TokenService,
    private readonly _authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>>
  {
    request = this._setHeaders(request);
    const refreshToken = this._tokenService.refreshToken || '';

    return next.handle(request).pipe(
      map(event => this._log(event)),
      catchError((error: HttpErrorResponse) =>
      {
        console.log(error);
        if (error.status !== 401)
        {
          return throwError(error);
        }

        if (error.error.error === 'invalid_token')
        {
          this._authService.refreshToken({ refresh: refreshToken }).subscribe(() =>
          {
            location.reload();
          });
        }

        void this._router.navigate(['login']);

        return throwError(error);
      })
    );
  }

  private _setHeaders(request: HttpRequest<unknown>): HttpRequest<unknown>
  {
    if (this._tokenService.token)
    {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this._tokenService.token,
        },
      });
    }

    if (!request.headers.has('Content-Type'))
    {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return request;
  }

  private _log(event: HttpEvent<unknown>)
  {
    if (event instanceof HttpResponse)
    {
      console.log('event--->>>', event);
    }
    return event;
  }
}

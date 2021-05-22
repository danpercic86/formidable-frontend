import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
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
  )
  {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>>
  {
    console.log(request);
    if (!request.withCredentials) return next.handle(request);
    request = this._setHeaders(request);

    return next.handle(request).pipe(
      map(event => this._log(event)),
      catchError((error: HttpErrorResponse) =>
      {
        console.log(error);
        if (error.status !== 401 && error.status !== 403)
        {
          return throwError(error);
        }

        if (this._authService.isLoggedIn()) this._authService.logout();

        if (error.error === 'invalid_token')
        {
          this._authService.refreshToken().subscribe(() =>
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
    if (this._tokenService.rawToken)
    {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this._tokenService.rawToken
        }
      });
    }

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

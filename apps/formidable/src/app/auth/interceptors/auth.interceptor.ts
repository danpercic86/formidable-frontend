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
import { catchError, map, take } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
  constructor(
    private readonly _router: Router,
    private readonly _tokenService: TokenService,
    private readonly _authService: AuthService,
    private readonly _logger: NGXLogger
  )
  {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>>
  {
    this._logger.debug('Intercepted request: ', request);

    if (!request.withCredentials) return next.handle(request);

    request = this._setAuthHeaders(request);

    return next.handle(request).pipe(
      map(event => this._log(event)),
      catchError((error: HttpErrorResponse) =>
      {
        this._logger.debug('Https response error: ', error);

        if (error.error === 'invalid_token')
        {
          this._authService.refreshToken().pipe(take(1)).subscribe(() =>
          {
            location.reload();
          });
        }

        if (
          (error.status !== 401 && error.status !== 403) ||
          !this._authService.isLoggedIn()
        )
        {
          return throwError(error);
        }

        if (this._authService.isLoggedIn()) this._authService.logout();

        return throwError(error);
      })
    );
  }

  private _setAuthHeaders(request: HttpRequest<unknown>): HttpRequest<unknown>
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
      this._logger.debug('Http response event: ', event);
    }
    return event;
  }
}

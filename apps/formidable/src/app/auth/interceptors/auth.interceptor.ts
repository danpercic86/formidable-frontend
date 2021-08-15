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
import { catchError, take, tap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { NGXLogger } from 'ngx-logger';

interface IError
{
  readonly code: string;
  readonly detail: string;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
  constructor(
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

    return next.handle(this._setAuthHeaders(request)).pipe(
      tap(event => this._log(event)),
      catchError(error => this._handleError(error))
    );
  }

  private _handleError(error: HttpErrorResponse): Observable<never>
  {
    this._logger.debug('Https response error: ', error);

    if (this._authService.isLoggedIn()) this._authService.logout();

    if ((<IError>error.error).code === 'token_not_valid')
    {
      const refreshTokenRequest = this._authService.refreshToken().pipe(take(1));
      refreshTokenRequest.subscribe(() => location.reload());
    }

    return throwError(() => new Error(error.message));
  }

  private _setAuthHeaders(request: HttpRequest<unknown>): HttpRequest<unknown>
  {
    if (this._tokenService.rawToken)
    {
      return request.clone({
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

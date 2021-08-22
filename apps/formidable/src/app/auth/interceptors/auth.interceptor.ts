import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

interface IError {
  readonly code: string;
  readonly detail: string;
}

function setAuthHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
  if (TokenService.rawToken) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${TokenService.rawToken}`,
      },
    });
  }

  return request;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService, private readonly _logger: NGXLogger) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._logger.debug('Intercepted request: ', request);
    const { withCredentials, url } = request;

    if ((!withCredentials && url.includes('/auth/')) || !url.includes('api/'))
      return next.handle(request);

    return next.handle(setAuthHeaders(request)).pipe(
      tap(event => this._log(event)),
      catchError(error => this._handleError(error)),
    );
  }

  private _handleError(error: HttpErrorResponse): Observable<never> {
    this._logger.debug('Https response error: ', error);

    if ((<IError>error.error).code === 'token_not_valid') {
      this._authService.logout();

      const refreshTokenRequest = this._authService.refreshToken().pipe(take(1));
      refreshTokenRequest.subscribe(() => window.location.reload());
    }

    return throwError(() => new Error(error.message));
  }

  private _log(event: HttpEvent<unknown>) {
    if (event instanceof HttpResponse) {
      this._logger.debug('Http response event: ', event);
    }
    return event;
  }
}

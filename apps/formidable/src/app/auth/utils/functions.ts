import { AuthService } from '../services/auth.service';
import { NGXLogger } from 'ngx-logger';
import { take } from 'rxjs/operators';

export function autoAuthenticate(authService: AuthService, logger: NGXLogger)
{
  return (): Promise<void> =>
    new Promise<void>(resolve =>
    {
      logger.debug('Auto refresh token on start');

      authService.refreshToken().pipe(take(1)).subscribe();

      resolve();
    });
}

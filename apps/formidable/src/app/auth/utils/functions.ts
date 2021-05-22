import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

export function autoAuthenticate(authService: AuthService, logger: NGXLogger)
{
  return (): Promise<void> =>
    new Promise(resolve =>
    {
      // attempt to refresh token on app start up to auto authenticate
      logger.debug('Auto authenticate');
      authService.refreshToken().pipe(take(1)).subscribe().add(resolve);
    });
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(
    private readonly _authService: AuthService,
    private readonly _tokenService: TokenService,
    private readonly _router: Router
  )
  {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this._tokenService.refreshToken ? true : this._toLogin(state.url);
  }

  private _toLogin(url: string): boolean
  {
    this._authService.redirectUrl = url;
    void this._router.navigate(['/auth/login']).then();
    return false;
  }
}

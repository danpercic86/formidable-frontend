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

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  )
  {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this._authService.isLoggedIn() ?? this._toLogin(state.url);
  }

  private async _toLogin(returnUrl: string): Promise<boolean>
  {
    const queryParams = { returnUrl };
    return this._router.navigate(['auth', 'login'], { queryParams });
  }
}

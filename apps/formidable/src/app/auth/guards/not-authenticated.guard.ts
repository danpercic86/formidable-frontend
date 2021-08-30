import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._authService.isLoggedIn) return true;

    // eslint-disable-next-line no-void
    void this._router.navigate(['/home']);

    return false;
  }
}

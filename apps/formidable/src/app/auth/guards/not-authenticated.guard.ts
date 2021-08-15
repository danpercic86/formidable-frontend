import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private readonly _router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!AuthService.isLoggedIn()) return true;

    // eslint-disable-next-line no-void
    void this._router.navigate(['/']);

    return false;
  }
}

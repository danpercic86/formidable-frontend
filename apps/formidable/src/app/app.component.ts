import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'formidable-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
{
  title = 'formidable-frontend';
  constructor(private readonly _authService: AuthService){}

  isLoggedIn(): boolean
  {
    return this._authService.isLoggedIn();
  }

  logout(): void
  {
    this._authService.logout();
  }
}

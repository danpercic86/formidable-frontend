import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'formidable-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent
{
  title = 'formidable-frontend';

  constructor(readonly authService: AuthService)
  {
  }
}

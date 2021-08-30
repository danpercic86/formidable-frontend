import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BtnColors } from '@formidable/shared';
import { CustomErrorStateMatcher } from '../../utils/error-state-matcher';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['../../auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  readonly btnColors = BtnColors;
  readonly form = this._formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  readonly isLoading$ = new BehaviorSubject(false);
  readonly isAuthError$ = new BehaviorSubject(false);
  readonly matcher = new CustomErrorStateMatcher();

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _logger: NGXLogger,
  ) {}

  onSubmit(): Promise<void> {
    this.isLoading$.next(true);

    return firstValueFrom(this._authService.login(this.form.value)).then(
      // eslint-disable-next-line no-void
      () => void this._router.navigate(['/home']),
      () => {
        this.isAuthError$.next(true);
        this.isLoading$.next(false);
      },
    );
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BtnColors } from '@formidable/shared';
import { CustomErrorStateMatcher } from '../../utils/error-state-matcher';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['../../auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  readonly btnColors = BtnColors;
  readonly form = this._formBuilder.group({
    email: [null, Validators.required],
    password1: [null, Validators.required],
    password2: [null, Validators.required],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
  });

  readonly isLoading$ = new BehaviorSubject(false);

  readonly matcher = new CustomErrorStateMatcher();

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
  ) {}

  onFormSubmit(): Promise<void> {
    this.isLoading$.next(true);
    return firstValueFrom(this._authService.register(this.form.value)).then(
      // eslint-disable-next-line no-void
      () => void this._router.navigate(['auth', 'login']),
      () => this.isLoading$.next(false),
    );
  }
}

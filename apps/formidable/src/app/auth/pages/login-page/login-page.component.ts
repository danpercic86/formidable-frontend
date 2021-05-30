import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomErrorStateMatcher } from '../../utils/error-state-matcher';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'formidable-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../../auth.component.scss']
})
export class LoginPageComponent implements OnInit
{
  form: FormGroup;
  isLoading = false;
  authError = false;
  matcher = new CustomErrorStateMatcher();

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _logger: NGXLogger
  )
  {
  }

  ngOnInit(): void
  {
    this.form = this._formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(): void
  {
    this.isLoading = true;

    this._authService.login(this.form.value).pipe(take(1))
      .subscribe(
        () => void this._router.navigate(['/home']),
        () =>
        {
          this.authError = true;
          this.isLoading = false;
        }
      );
  }
}

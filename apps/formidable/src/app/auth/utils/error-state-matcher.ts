import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  // eslint-disable-next-line class-methods-use-this
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const hasChanged = control?.dirty || control?.touched || form?.submitted;
    return !!(control?.invalid && hasChanged);
  }
}

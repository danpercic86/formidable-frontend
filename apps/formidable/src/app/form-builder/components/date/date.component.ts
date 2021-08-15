import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldComponent } from '@builder/shared';

@Component({
  templateUrl: './date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent extends FieldComponent {}

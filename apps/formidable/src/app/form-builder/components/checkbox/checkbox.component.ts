import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldComponent } from '@builder/shared';

@Component({
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends FieldComponent
{
}

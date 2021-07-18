import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldComponent } from '@builder/shared';

@Component({
  templateUrl: './radio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent extends FieldComponent
{
}

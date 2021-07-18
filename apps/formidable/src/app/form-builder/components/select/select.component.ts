import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldComponent } from '@builder/shared';

@Component({
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends FieldComponent
{
}

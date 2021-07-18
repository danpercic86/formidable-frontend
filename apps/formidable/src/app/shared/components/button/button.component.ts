import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  BtnColor,
  BtnColors,
  BtnType,
  BtnTypes
} from '../../constants/button.constants';

@Component({
  selector: 'formidable-button',
  templateUrl: './button.component.html',
  styleUrls: ['button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent
{
  @Input()
  text = 'Submit';
  @Input()
  matIcon = '';
  @Input()
  loading = false;
  @Input()
  disabled = false;
  @Input()
  routerLink: string | string[] = '';
  @Input()
  small = false;
  @Input()
  color: BtnColor = BtnColors.primary;
  @Input()
  type: BtnType = BtnTypes.button;
  @Output()
  action = new EventEmitter<Event | Record<string, unknown>>();
}

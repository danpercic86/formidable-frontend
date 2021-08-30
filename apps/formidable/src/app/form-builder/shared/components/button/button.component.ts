import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BtnColor, BtnColors, BtnType, BtnTypes } from '../../../../shared';

@Component({
  selector: 'formidable-button',
  templateUrl: './button.component.html',
  styleUrls: ['button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() text = 'Submit';
  @Input() matIcon?: string;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() color: BtnColor = BtnColors.primary;
  @Input() type: BtnType = BtnTypes.button;
  @Output() readonly action = new EventEmitter<MouseEvent | Event>();
}

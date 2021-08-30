import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IForm } from '@builder/shared';
import { BtnColors } from '@formidable/shared';
import { LinkTextColors } from '../../../../form-builder/shared/components/link/link-text-color.type';

@Component({
  selector: 'formidable-form-card [form]',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardComponent {
  @Input() form!: IForm;

  readonly textColors = LinkTextColors;
  readonly btnColors = BtnColors;
}

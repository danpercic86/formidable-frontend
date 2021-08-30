import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BtnColor, BtnColors } from '@formidable/shared';
import { LinkTextColor, LinkTextColors } from './link-text-color.type';

@Component({
  selector: 'formidable-link [text] [routerLink]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() text!: string;
  @Input() routerLink!: string | string[];
  @Input() color: BtnColor = BtnColors.white;
  @Input() textColor: LinkTextColor = LinkTextColors.primary;
}

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { BtnColor, BtnColors } from '@formidable/shared';
import { SecondOptionDisplay, SecondOptionDisplays } from './second-option-display.type';
import { LinkTextColor, LinkTextColors } from '../link/link-text-color.type';

@Component({
  selector: 'formidable-second-option [title] [routerLink] [linkText]',
  templateUrl: './second-option.component.html',
  styleUrls: ['./second-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondOptionComponent {
  @Input() title!: string;
  @Input() routerLink!: string;
  @Input() linkText!: string;
  @Input() color: BtnColor = BtnColors.white;
  @Input() linkTextColor: LinkTextColor = LinkTextColors.primary;
  @Input() display: SecondOptionDisplay = SecondOptionDisplays.vertical;

  @HostBinding('class.flex-column')
  private get _direction() {
    return this.display === SecondOptionDisplays.vertical;
  }
}

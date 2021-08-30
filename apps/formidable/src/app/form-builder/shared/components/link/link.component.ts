import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BtnColor, BtnColors } from '@formidable/shared';
import { Memo } from '@danpercic86/helpful-decorators';
import { LinkTextColor, LinkTextColors } from './link-text-color.type';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'formidable-link [text] [link]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() text!: string;
  @Input() link!: string;
  @Input() color: BtnColor = BtnColors.white;
  @Input() textColor: LinkTextColor = LinkTextColors.primary;
  @Input() matIcon?: string;

  @Memo()
  // eslint-disable-next-line class-methods-use-this
  isExternalLink(value: string): boolean {
    const valueLc = value.toLowerCase();
    return valueLc.startsWith('http://') || valueLc.startsWith('https://');
  }

  @Memo()
  href(value: string): string {
    return this._isEmail(value) ? `mailto:${value}` : value;
  }

  @Memo()
  // eslint-disable-next-line class-methods-use-this
  private _isEmail(value: string): boolean {
    return emailRegex.test(value.toLowerCase());
  }
}

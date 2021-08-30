import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BtnColors } from '@formidable/shared';
import { SecondOptionDisplays } from '../../form-builder/shared/components/second-option/second-option-display.type';

@Component({
  selector: 'formidable-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  readonly btnColors = BtnColors;
  readonly secondOptionDisplays = SecondOptionDisplays;

  constructor(readonly router: Router) {}
}

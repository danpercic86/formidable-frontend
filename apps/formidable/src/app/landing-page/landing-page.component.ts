import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BtnColors } from '@formidable/shared';

@Component({
  selector: 'formidable-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  readonly btnColors = BtnColors;

  constructor(readonly router: Router) {}
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'formidable-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly isHandset$ = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay(),
  );

  constructor(
    readonly authService: AuthService,
    private readonly _breakpointObserver: BreakpointObserver,
  ) {}
}

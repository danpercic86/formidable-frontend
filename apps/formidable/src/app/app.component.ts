import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
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
  readonly currentUrl$ = this._router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).url),
    startWith(this._router.url),
  );

  constructor(
    readonly authService: AuthService,
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _router: Router,
  ) {}
}

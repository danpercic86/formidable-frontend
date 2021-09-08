import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

interface MenuItem {
  readonly text: string;
  readonly icon: string;
  readonly routerLink?: string;
  readonly routerLinkActive?: string;
  readonly action?: () => void;
  readonly hide?: () => Observable<boolean>;
}

type MenuItems = readonly MenuItem[];

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

  readonly menuItems: MenuItems = [
    {
      text: 'Pagina principală',
      routerLink: '/',
      icon: 'explore',
    },
    {
      text: 'Acasă',
      routerLink: '/home',
      icon: 'home',
      hide: (): Observable<boolean> => this._isNotLoggedIn,
    },
    {
      text: 'Profil',
      routerLink: '/home/forms/6/sections',
      icon: 'person',
      hide: (): Observable<boolean> => this._isNotLoggedIn,
    },
    {
      text: 'Logout',
      action: (): void => this.authService.logout(),
      icon: 'logout',
      hide: (): Observable<boolean> => this._isNotLoggedIn,
    },
    {
      text: 'Autentificare',
      routerLink: '/auth/login',
      routerLinkActive: 'd-none',
      icon: 'login',
      hide: (): Observable<boolean> => this.authService.isLoggedIn$,
    },
    {
      text: 'Înregistrare',
      routerLink: '/auth/register',
      routerLinkActive: 'd-none',
      icon: 'how_to_reg',
      hide: (): Observable<boolean> => this.authService.isLoggedIn$,
    },
  ];

  constructor(
    readonly authService: AuthService,
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _router: Router,
  ) {}

  private get _isNotLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      map(isLoggedIn => !isLoggedIn),
      shareReplay(1),
    );
  }
}

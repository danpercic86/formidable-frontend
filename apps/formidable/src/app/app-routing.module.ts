import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [NotAuthenticatedGuard],
  },
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

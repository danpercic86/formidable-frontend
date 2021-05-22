import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section/section.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

const routes: Routes = [
  {
    path: 'sections/:id',
    component: SectionComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [NotAuthenticatedGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
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

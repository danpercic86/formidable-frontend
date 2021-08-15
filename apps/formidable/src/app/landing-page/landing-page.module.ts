import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LandingPageModule {}

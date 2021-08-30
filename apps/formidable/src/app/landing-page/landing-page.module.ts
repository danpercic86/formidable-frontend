import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderSharedModule } from '@builder/shared';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LandingPageComponent } from './landing-page.component';
import { BannerComponent } from './banner/banner.component';

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
  declarations: [LandingPageComponent, BannerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormBuilderSharedModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule,
  ],
})
export class LandingPageModule {}

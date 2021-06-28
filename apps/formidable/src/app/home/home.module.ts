import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { MatCardModule } from '@angular/material/card';
import { FormBuilderModule } from '../form-builder';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { GlobalSharedModule } from '@formidable/shared';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    HomePageComponent,
    SectionPageComponent,
    FormPageComponent
  ],
  imports: [
    HomeRoutingModule,
    MatCardModule,
    FormBuilderModule,
    GlobalSharedModule,
    MatStepperModule
  ]
})
export class HomeModule
{
}

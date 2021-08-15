import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { MatCardModule } from '@angular/material/card';
import { FormBuilderModule } from '@builder/core';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { GlobalSharedModule } from '@formidable/shared';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilderSharedModule } from '@builder/shared';
import { FormStepComponent } from './pages/section-page/form-step/form-step.component';

@NgModule({
  declarations: [HomePageComponent, SectionPageComponent, FormPageComponent, FormStepComponent],
  imports: [
    HomeRoutingModule,
    MatCardModule,
    FormBuilderModule,
    GlobalSharedModule,
    MatStepperModule,
    FormBuilderSharedModule,
  ],
})
export class HomeModule {}

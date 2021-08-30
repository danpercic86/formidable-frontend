import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { FormBuilderModule } from '@builder/core';
import { GlobalSharedModule } from '@formidable/shared';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilderSharedModule } from '@builder/shared';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormStepComponent } from './pages/section-page/form-step/form-step.component';
import { FormCardComponent } from './pages/home-page/form-card/form-card.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SectionPageComponent,
    FormPageComponent,
    FormStepComponent,
    FormCardComponent,
  ],
  imports: [
    HomeRoutingModule,
    MatCardModule,
    FormBuilderModule,
    GlobalSharedModule,
    MatStepperModule,
    FormBuilderSharedModule,
    MatGridListModule,
  ],
})
export class HomeModule {}

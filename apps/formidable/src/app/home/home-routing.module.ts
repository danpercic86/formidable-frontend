import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'forms/:id',
    component: FormPageComponent,
  },
  {
    path: 'forms/:id/sections',
    component: SectionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

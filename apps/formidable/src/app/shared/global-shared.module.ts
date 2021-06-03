import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

const modules = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule
];

const components = [
  ButtonComponent
];

@NgModule({
  declarations: [...components, NavbarComponent],
  imports: [...modules, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule],
  exports: [...components, ...modules, NavbarComponent]
})
export class GlobalSharedModule
{
}

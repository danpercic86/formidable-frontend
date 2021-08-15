import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

const modules = [
  CommonModule,
  RouterModule,
  LayoutModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
];

@NgModule({
  eclarations: [],
  mports: [...modules],
  xports: [...modules],
})
export class GlobalSharedModule {}

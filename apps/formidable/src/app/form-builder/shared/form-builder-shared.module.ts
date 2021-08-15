import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './components/button/button.component';

const matImports = [MatButtonModule, MatProgressSpinnerModule, MatIconModule];

const modules = [CommonModule, RouterModule];

const components = [ButtonComponent];

@NgModule({
  declarations: [...components],
  imports: [...matImports, ...modules],
  exports: [...matImports, ...modules, ...components],
})
export class FormBuilderSharedModule {}

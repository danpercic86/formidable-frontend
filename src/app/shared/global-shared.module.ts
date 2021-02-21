import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, RouterModule, MatButtonModule],
    exports: [ButtonComponent],
})
export class GlobalSharedModule {}

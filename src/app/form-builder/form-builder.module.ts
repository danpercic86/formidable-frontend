import { NgModule } from '@angular/core';
import { FormBuilderComponent } from './form-builder.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [FormBuilderComponent],
    imports: [SharedModule],
    exports: [FormBuilderComponent],
})
export class FormBuilderModule {}

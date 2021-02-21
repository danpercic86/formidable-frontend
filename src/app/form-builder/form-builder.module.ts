import { NgModule } from '@angular/core';
import { FormBuilderComponent } from './form-builder.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { DateComponent } from './components/date/date.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalSharedModule } from '@shared/global-shared.module';

const matImports = [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRadioModule,
];

@NgModule({
    declarations: [
        FormBuilderComponent,
        InputComponent,
        SelectComponent,
        DateComponent,
        RadioComponent,
        CheckboxComponent,
        DynamicFieldDirective,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ...matImports,
        GlobalSharedModule,
    ],
    exports: [FormBuilderComponent],
})
export class FormBuilderModule {}

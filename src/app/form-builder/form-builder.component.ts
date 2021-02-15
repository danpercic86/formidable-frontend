import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldModel, ValidatorModel, ValidatorTypes } from './shared/models';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'formidable-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
    @Input() fields: FieldModel[] = [];
    @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
    form: FormGroup = {} as FormGroup;

    private static __getValidatorFn(validator: ValidatorModel): ValidatorFn {
        switch (validator.type) {
            case ValidatorTypes.maxLength:
                return Validators.minLength(parseInt(validator.constraint));
            case ValidatorTypes.minLength:
                return Validators.minLength(parseInt(validator.constraint));
            case ValidatorTypes.regex:
                return Validators.pattern(validator.constraint);
        }
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.__createControl();
    }

    private __createControl(): FormGroup {
        const group = this.fb.group({});
        this.fields.forEach((field) => {
            const control = this.fb.control(field.value, this.__bindValidations(field.validators));
            group.addControl(field.name, control);
        });
        return group;
    }

    private __bindValidations(validators: ValidatorModel[]) {
        if (validators.length > 0) {
            const validList: ValidatorFn[] = [];
            validators.forEach((valid) => {
                validList.push(FormBuilderComponent.__getValidatorFn(valid));
            });
            return Validators.compose(validList);
        }
        return null;
    }

    onSubmit(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.form.valid) {
            this.formSubmit.emit(this.form.value);
        } else {
            this.__validateAllFormFields(this.form);
        }
    }

    private __validateAllFormFields(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            control?.markAsTouched({ onlySelf: true });
        });
    }

    public get value(): any {
        return this.form.value;
    }
}

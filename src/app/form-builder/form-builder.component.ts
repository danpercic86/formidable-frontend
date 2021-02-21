import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldModel, ValidatorModel, ValidatorTypes } from './shared/models';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'formidable-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
    @Input() fields: FieldModel[];
    @Output() formSubmit: EventEmitter<Record<string, unknown>> = new EventEmitter<Record<string, unknown>>();
    form: FormGroup;
    loading = false;

    private static _getValidatorFn(validator: ValidatorModel): ValidatorFn {
        switch (validator.type) {
            case ValidatorTypes.maxLength:
                return Validators.maxLength(parseInt(validator.constraint));
            case ValidatorTypes.minLength:
                return Validators.minLength(parseInt(validator.constraint));
            case ValidatorTypes.regex:
                return Validators.pattern(validator.constraint);
            case ValidatorTypes.email:
                return Validators.email;
            case ValidatorTypes.required:
                return Validators.required;
            case ValidatorTypes.max:
                return Validators.max(parseInt(validator.constraint));
            case ValidatorTypes.min:
                return Validators.min(parseInt(validator.constraint));
        }
    }

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {
        console.log(this.fields);
        this.form = this._createFormGroup();
    }

    private _createFormGroup(): FormGroup {
        const group = this._fb.group({});
        this.fields.forEach((field) => {
            const control = this._fb.control(field.value, this._bindValidators(field.validators));
            group.addControl(field.name, control);
        });
        return group;
    }

    private _bindValidators(validators: ValidatorModel[]): ValidatorFn | null {
        const validList: ValidatorFn[] = [];
        validators.forEach((valid) => {
            validList.push(FormBuilderComponent._getValidatorFn(valid));
        });
        return Validators.compose(validList);
    }

    onSubmit(event: Event): void {
        this.loading = true;
        event.preventDefault();
        event.stopPropagation();
        if (this.form.valid) {
            this.formSubmit.emit(this.form.value);
        } else {
            this._validateAllFormFields(this.form);
        }
        this.loading = false;
    }

    private _validateAllFormFields(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            control?.markAsTouched({ onlySelf: true });
        });
    }

    public get value(): Record<string, unknown> {
        return this.form.value as Record<string, unknown>;
    }
}

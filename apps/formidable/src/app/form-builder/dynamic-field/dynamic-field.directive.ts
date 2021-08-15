import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { InputComponent } from '../components/input/input.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { FieldComponent, IField } from '@builder/shared';
import { ValidatorsService } from '@builder/core';
import { debounceTime, filter } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FIELD, FORM } from '../shared/tokens';
import { AutoUnsubscribeComponent } from '../shared/components/auto-unsubscribe.component';

const componentMapper = {
  text: InputComponent,
  email: InputComponent,
  url: InputComponent,
  tel: InputComponent,
  integer: InputComponent,
  decimal: InputComponent,
  checkbox: CheckboxComponent
  // file: InputComponent,
  // select: SelectComponent,
  // date: DateComponent,
  // radio: RadioComponent,
} as const;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'formidable-dynamic-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DynamicFieldDirective
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DynamicFieldDirective
    }
  ]
})
export class DynamicFieldDirective extends AutoUnsubscribeComponent
  implements OnInit, ControlValueAccessor, Validator, OnDestroy
{
  @Input() form!: FormGroup;
  @Input() field!: IField;
  private _touched = false;
  private _onTouched?: () => unknown;
  private _onChange?: (value: unknown) => unknown;
  private _componentRef?: ComponentRef<FieldComponent>;

  constructor(
    private readonly _injector: Injector,
    private readonly _formBuilder: FormBuilder,
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _validatorsService: ValidatorsService
  )
  {
    super();
  }

  protected get _control(): AbstractControl | never
  {
    const control = this.form.get(this.field.id.toString());
    if (control === null) throw new Error('Something went wrong, control is null!');
    return control;
  }

  ngOnInit(): void
  {
    this._subscribeToFormChanges();
    this._createComponent();
  }

  ngOnDestroy(): void
  {
    this._componentRef?.destroy();
    super.ngOnDestroy();
  }

  registerOnChange = (fn: (value: unknown) => unknown) => (this._onChange = fn);

  registerOnTouched = (fn: () => unknown) => (this._onTouched = fn);

  writeValue(value: unknown): void
  {
    console.log(value, this.field.id.toString());
  }

  validate(): ValidationErrors
  {
    return this._validatorsService.validateControl(this.form, this.field.id.toString());
  }

  setDisabledState(isDisabled: boolean): void
  {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  private _subscribeToFormChanges(): void
  {
    const markAsTouched = () => this._markAsTouched();
    const formIsEnabled = () => !this.form.disabled;

    this.subscriptions = this._control.valueChanges
      .pipe(debounceTime(300), tap(markAsTouched), filter(formIsEnabled))
      .subscribe(console.log);
  }

  private _createComponent()
  {
    const factory = this._resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );

    const injector: Injector = Injector.create(
      {
        providers: [{
          provide: FIELD, useValue: this.field
        }, {
          provide: FORM, useValue: this.form
        }], parent: this._injector
      });
    this._componentRef = this._viewContainerRef.createComponent(factory, 0, injector);
  }

  private _markAsTouched(): void
  {
    if (!this._touched)
    {
      this._onTouched?.();
      this._touched = true;
    }
  }
}

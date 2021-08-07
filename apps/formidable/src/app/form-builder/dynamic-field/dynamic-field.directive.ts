import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { InputComponent } from '../components/input/input.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import {
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
import { filter, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  selector: '[formidableDynamicField]',
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
export class DynamicFieldDirective
  extends FieldComponent
  implements OnInit, ControlValueAccessor, Validator, OnDestroy
{
  @Input() field!: Readonly<IField>;
  private _touched = false;
  private _onTouched?: () => unknown;
  private _onChange?: (value: unknown) => unknown;
  private readonly _subscriptions = new Subscription();
  private _componentRef?: ComponentRef<FieldComponent>;

  constructor(
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _container: ViewContainerRef,
    private readonly _formBuilder: FormBuilder,
    private readonly _validatorsService: ValidatorsService
  )
  {
    super();
  }

  private set _value(value: unknown)
  {
    this.writeValue(value);
    this._onChange?.(value);
  }

  private set _addSubscription(subscription: Subscription)
  {
    this._subscriptions.add(subscription);
  }

  ngOnInit(): void
  {
    this.form = this._buildForm();
    this._subscribeToFormChanges();
    this._createComponent();
  }

  ngOnDestroy(): void
  {
    this._componentRef?.destroy();
    this._subscriptions.unsubscribe();
  }

  registerOnChange = (fn: (value: unknown) => unknown) => (this._onChange = fn);

  registerOnTouched = (fn: () => unknown) => (this._onTouched = fn);

  writeValue(value: unknown): void
  {
    this.form.setValue({ [this.field.name]: value }, { emitEvent: false });
  }

  validate(): ValidationErrors | null
  {
    const errors = this._validatorsService.validate(this.form);
    return errors[this.field.name];
  }

  setDisabledState(isDisabled: boolean): void
  {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  private _buildForm(): FormGroup
  {
    return this._formBuilder.group({
      [this.field.name]: [
        this.field.value,
        ValidatorsService.compose(this.field.validators)
      ]
    });
  }

  private _subscribeToFormChanges(): void | never
  {
    const markAsTouched = () => this._markAsTouched();
    const formIsEnabled = () => !this.form.disabled;
    const onValueChanges = (value: unknown) => (this._value = value);

    this._addSubscription = this._control.valueChanges
      .pipe(tap(markAsTouched), filter(formIsEnabled))
      .subscribe(onValueChanges);
  }

  private _createComponent()
  {
    const factory = this._resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this._componentRef = this._container.createComponent(factory);
    this._componentRef.instance.field = this.field;
    this._componentRef.instance.form = this.form;
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

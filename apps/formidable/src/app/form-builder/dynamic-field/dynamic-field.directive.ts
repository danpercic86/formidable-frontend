import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import { InputComponent } from '../components/input/input.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { FieldComponent, IField } from '@builder/shared';
import { ValidatorsService } from '../../core/services/components/validators.service';
import { Subscription } from 'rxjs';

const componentMapper: { [type: string]: Type<FieldComponent> } = {
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
};

@Directive({
  selector: '[formidableDynamicField]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DynamicFieldDirective
    }
  ]
})
export class DynamicFieldDirective implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input() field: IField;
  private _form: FormGroup;
  private _onTouched: unknown;
  private _componentRef: ComponentRef<FieldComponent>;
  private readonly _onChangeSubs = new Subscription();

  constructor(
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _container: ViewContainerRef,
    private readonly _formBuilder: FormBuilder
  )
  {
  }

  ngOnInit(): void
  {
    this._form = this._formBuilder.group({
      [this.field.name]: [
        this.field.value,
        ValidatorsService.compose(this.field.validators)
      ]
    });
    const factory = this._resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this._componentRef = this._container.createComponent(factory);
    this._componentRef.instance.field = this.field;
    this._componentRef.instance.form = this._form;
  }

  ngOnDestroy(): void
  {
    this._onChangeSubs.unsubscribe();
  }

  registerOnChange(fn: () => void): void
  {
    this._onChangeSubs.add(this._form.valueChanges.subscribe(fn));
  }

  registerOnTouched(fn: unknown): void
  {
    this._onTouched = fn;
  }

  writeValue(value: { [p: string]: unknown }): void
  {
    if (value)
    {
      this._form.setValue(value, { emitEvent: false });
    }
  }

  setDisabledState(isDisabled: boolean): void
  {
    isDisabled ? this._form.disable() : this._form.enable();
  }
}

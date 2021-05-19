import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { InputComponent } from '../components/input/input.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { FormGroup } from '@angular/forms';
import { FieldModel } from '../shared/models';
import { FieldComponent } from '../shared/field.component';

const componentMapper: { [type: string]: Type<FieldComponent> } = {
  text: InputComponent,
  email: InputComponent,
  url: InputComponent,
  tel: InputComponent,
  integer: InputComponent,
  decimal: InputComponent,
  checkbox: CheckboxComponent,
  // file: InputComponent,
  // select: SelectComponent,
  // date: DateComponent,
  // radio: RadioComponent,
};

@Directive({
  selector: '[formidableDynamicField]',
})
export class DynamicFieldDirective implements OnInit
{
  @Input() field: FieldModel;
  @Input() group: FormGroup;
  private _componentRef: ComponentRef<FieldComponent>;

  constructor(
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _container: ViewContainerRef,
  ) {}

  ngOnInit(): void
  {
    const factory = this._resolver.resolveComponentFactory(
      componentMapper[this.field.type],
    );
    this._componentRef = this._container.createComponent(factory);
    this._componentRef.instance.field = this.field;
    this._componentRef.instance.group = this.group;
  }
}

import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnInit,
    Type,
    ViewContainerRef,
} from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { DateComponent } from './components/date/date.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FormGroup } from '@angular/forms';
import { FieldModel } from './shared/models';
import { FieldComponent } from './shared/field.component';

const componentMapper: { [type: string]: Type<FieldComponent> } = {
    input: InputComponent,
    text: InputComponent,
    email: InputComponent,
    file: InputComponent,
    select: SelectComponent,
    date: DateComponent,
    radio: RadioComponent,
    checkbox: CheckboxComponent,
};

@Directive({
    selector: '[formidableDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
    @Input() field: FieldModel;
    @Input() group: FormGroup;
    componentRef: ComponentRef<FieldComponent>;

    constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

    ngOnInit(): void {
        const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }
}

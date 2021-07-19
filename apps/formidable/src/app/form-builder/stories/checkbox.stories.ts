import { Meta, Story } from '@storybook/angular/types-6-0';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { FieldTypes, IField } from '@builder/shared';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsService } from '../services/validators.service';

export default {
  title: 'Form builder/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatCheckboxModule,
        ReactiveFormsModule
      ]
    }),
    componentWrapperDecorator(story => `<form>${story}</form>`)
  ]
} as Meta;

const Template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
  props: {
    ...args
  }
});

const field: IField = {
  choices: [],
  dependent_value: '',
  id: 'adfsdafasf',
  is_required: false,
  placeholder: 'Field placeholder',
  type: FieldTypes.text,
  validators: [],
  value: 'Field value',
  name: 'Some field here'
};

const form = new FormGroup({
  'Some field here': new FormControl(
    field.value,
    ValidatorsService.compose(field.validators)
  )
});

const defaultArgs = {
  field: field
} as CheckboxComponent;

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs
} as CheckboxComponent;

// import { Meta, Story } from '@storybook/angular/types-6-0';
// import { CommonModule } from '@angular/common';
// import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
// import { FieldTypes, IField } from '@builder/shared';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { ValidatorsService } from '../../core/services/components/validators.service';
// import { InputComponent } from '../components/input/input.component';
//
// export default {
//   title: 'Form builder/Input',
//   component: InputComponent,
//   decorators: [
//     moduleMetadata({
//       imports: [
//         CommonModule,
//         MatFormFieldModule,
//         MatInputModule,
//         ReactiveFormsModule
//       ]
//     }),
//     componentWrapperDecorator(story => `<form>${story}</form>`)
//   ]
// } as Meta;
//
// const Template: Story<InputComponent> = (args: InputComponent) => ({
//   props: {
//     ...args
//   },
// });
//
// const field: IField = {
//   choices: [],
//   dependent_value: '',
//   id: 'adfsdafasf',
//   is_required: false,
//   placeholder: 'Field placeholder',
//   type: FieldTypes.text,
//   validators: [],
//   value: 'Field value',
//   name: 'Some field here'
// };
//
// const form = new FormGroup({
//   'Some field here': new FormControl(
//     field.value,
//     ValidatorsService.compose(field.validators)
//   )
// });
//
// const defaultArgs = {
//   field: field,
//   form: form
// } as InputComponent;
//
// export const Text = Template.bind({});
// Text.args = {
//   ...defaultArgs
// } as InputComponent;
//
// // export const Email = Template.bind({});
// // Email.args = {
// //   form: defaultArgs.form,
// //   field: { ...defaultArgs.field, type: FieldTypes.email }
// // } as InputComponent;

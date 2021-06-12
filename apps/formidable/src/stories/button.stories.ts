import { Meta, Story } from '@storybook/angular/types-6-0';
import { BtnColors, BtnTypes, ButtonComponent } from '@formidable/shared';
import { moduleMetadata } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { RouterModule } from '@angular/router';

export default {
  title: 'Example/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        RouterModule.forRoot([], { useHash: true }),
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    })
  ]
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: {
    ...args,
    action: action('action')
  }
});

const defaultArgs = {
  text: 'Submit',
  color: BtnColors.primary,
  type: BtnTypes.button
} as ButtonComponent;

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
  routerLink: 'home'
} as ButtonComponent;

export const Link = Template.bind({});
Link.args = {
  ...defaultArgs,
  color: BtnColors.link,
  text: 'this is a link'
} as ButtonComponent;

export const Accent = Template.bind({});
Accent.args = {
  ...defaultArgs,
  color: BtnColors.accent
} as ButtonComponent;

export const Warn = Template.bind({});
Warn.args = {
  ...defaultArgs,
  color: BtnColors.warn
} as ButtonComponent;

export const Loading = Template.bind({});
Loading.args = {
  ...defaultArgs,
  loading: true
} as ButtonComponent;

export const Small = Template.bind({});
Small.args = {
  ...defaultArgs,
  small: true
} as ButtonComponent;

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...defaultArgs,
  matIcon: 'login',
  text: 'Login'
} as ButtonComponent;

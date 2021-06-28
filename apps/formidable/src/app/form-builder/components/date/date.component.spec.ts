import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComponent } from './date.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FieldTypes, IField } from '@builder/shared';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsService } from '../../../core/services/components/validators.service';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DateComponent', () =>
{
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;
  let loader: HarnessLoader;
  const field: IField = {
    choices: [],
    dependent_value: '',
    id: 'adfsdafasf',
    is_required: false,
    placeholder: 'Field placeholder',
    type: FieldTypes.integer,
    validators: [],
    value: 'Field value',
    name: 'Some field here'
  };

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [DateComponent],
      imports: [
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    component.field = field;
    component.form = new FormGroup({
      'Some field here': new FormControl(
        field.value,
        ValidatorsService.compose(field.validators)
      )
    });
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should create', async () =>
  {
    const date = await loader.getHarness(MatFormFieldHarness);
    expect(component).toBeTruthy();
  });
});

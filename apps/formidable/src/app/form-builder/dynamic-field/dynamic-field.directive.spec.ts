import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFieldDirective } from './dynamic-field.directive';

describe('DynamicFieldDirective', () => {
  let component: DynamicFieldDirective;
  let fixture: ComponentFixture<DynamicFieldDirective>;
  // const field: IField = {
  //   choices: Set(),
  //   dependent_value: '',
  //   id: 'adfsdafasf',
  //   is_required: false,
  //   placeholder: 'Field placeholder',
  //   type: FieldTypes.text,
  //   validators: Set(),
  //   value: 'Field value',
  //   name: 'Some field here',
  // };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFieldDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldDirective);
    component = fixture.componentInstance;
    // component.field = field;
    // component.form = new FormGroup({
    //   'Some field here': new FormControl(
    //     field.value,
    //     ValidatorsService.compose(field.validators)
    //   ),
    // });
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create an instance of a InputComponent', () => {
    expect(component).toBeTruthy();
  });
});

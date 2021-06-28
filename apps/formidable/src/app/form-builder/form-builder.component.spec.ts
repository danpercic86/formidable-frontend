import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderComponent } from './form-builder.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormBuilderComponent', () =>
{
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [FormBuilderComponent],
      imports: [
        ReactiveFormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});

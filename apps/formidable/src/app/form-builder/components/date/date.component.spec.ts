import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateComponent } from './date.component';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateComponent],
      imports: [
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

describe('ButtonComponent', () =>
{
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [RouterModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule]
    }).compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});

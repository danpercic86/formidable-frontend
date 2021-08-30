import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondOptionComponent } from './second-option.component';

describe('SecondOptionComponent', () => {
  let component: SecondOptionComponent;
  let fixture: ComponentFixture<SecondOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

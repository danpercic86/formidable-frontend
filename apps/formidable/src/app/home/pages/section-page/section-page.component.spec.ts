import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPageComponent } from './section-page.component';

describe('SectionComponent', () =>
{
  let component: SectionPageComponent;
  let fixture: ComponentFixture<SectionPageComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [SectionPageComponent]
    }).compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(SectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});

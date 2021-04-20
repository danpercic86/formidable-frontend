import { DynamicFieldDirective } from './dynamic-field.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('DynamicFieldDirective', () => {
    let component: DynamicFieldDirective;
    let fixture: ComponentFixture<DynamicFieldDirective>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DynamicFieldDirective],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFieldDirective);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });
});

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ISection, ISectionMinimal, trackBy } from '@builder/shared';
import { FormsService, SectionsService } from '@builder/core';

@Component({
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionPageComponent
{
  readonly step$ = new BehaviorSubject(0);
  readonly minimalSections$ = this._minimalSections$;
  readonly stepperOrientation$ = this._stepperOrientation$;
  readonly section$ = this._section$;
  readonly trackByFn = trackBy();

  constructor(
    readonly sectionsService: SectionsService,
    private readonly _route: ActivatedRoute,
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _formsService: FormsService
  )
  {
  }

  submit(data: Record<string, unknown>): void
  {
    console.log('form submitted');
    console.log(data);
  }

  private get _section$(): Observable<ISection>
  {
    return combineLatest([this.step$.asObservable(), this.minimalSections$]).pipe(
      map(([step, sections]) => (sections[step === sections.length ? step - 1 : step])),
      switchMap(section => this.sectionsService.getByKey(section.id))
    );
  }

  private get _minimalSections$(): Observable<ISectionMinimal[]>
  {
    const id = this._route.snapshot.paramMap.get('id') as string;
    return this._formsService.getByKey(id).pipe(map(form => form.sections));
  }

  private get _stepperOrientation$(): Observable<StepperOrientation>
  {
    return this._breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
}

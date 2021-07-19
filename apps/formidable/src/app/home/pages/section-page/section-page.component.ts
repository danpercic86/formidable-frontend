import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IForm, ISection, ISectionMinimal, trackByFn } from '@builder/shared';
import { FormsService, SectionsService } from '@builder/core';

@Component({
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss']
})
export class SectionPageComponent implements OnInit
{
  sections: ISectionMinimal[];
  stepperOrientation$: Observable<StepperOrientation>;
  step$ = new BehaviorSubject(0);
  section$ = this.step$.pipe(switchMap(step => this._getSectionByKey(step)));
  loading$ = this._sectionsService.loading$;
  trackByFn = trackByFn;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _sectionsService: SectionsService,
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _formsService: FormsService
  )
  {
    this.stepperOrientation$ = _breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  async ngOnInit(): Promise<void>
  {
    this.sections = (await this._getForm()).sections;
  }

  submit(data: Record<string, unknown>): void
  {
    console.log('form submitted');
    console.log(data);
  }

  stepSelectionChange(event: StepperSelectionEvent): void
  {
    let index = event.selectedIndex;
    if (event.selectedIndex === this.sections.length) index--;
    this.step$.next(index);
  }

  private _getSectionByKey(step: number): Observable<ISection>
  {
    return this._sectionsService.getByKey(this.sections[step].id);
  }

  private _getForm(): Promise<IForm>
  {
    const id = this._route.snapshot.paramMap.get('id') as string;
    return lastValueFrom(this._formsService.getByKey(id));
  }
}

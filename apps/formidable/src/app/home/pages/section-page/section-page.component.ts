import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ISection, ISectionMinimal, trackBy } from '@builder/shared';
import { FormsService, SectionsService } from '@builder/core';
import { getDataByKey } from '@formidable/shared';
import { ResponsesService } from '../../../form-builder/services/responses.service';
import { IResponse } from '../../../form-builder/shared/models/response.model';
import { Set } from 'immutable';

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
    private readonly _formsService: FormsService,
    private readonly _responsesService: ResponsesService
  )
  {
  }

  private get _section$(): Observable<ISection>
  {
    return combineLatest([this.step$.asObservable(), this.minimalSections$]).pipe(
      map(
        ([step, sections]) =>
        {
          const index = step === sections.size ? step - 1 : step;
          return [...sections][index].id;
        }
      ),
      getDataByKey(this.sectionsService)
    );
  }

  private get _minimalSections$(): Observable<Set<ISectionMinimal>>
  {
    const id = this._route.snapshot.paramMap.get('id') as string;
    return this._formsService.getByKey(id).pipe(map(form => Set(form.sections)));
  }

  private get _stepperOrientation$(): Observable<StepperOrientation>
  {
    return this._breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  submit(data: Record<string, unknown>, sectionId: string): void
  {
    console.log('form submitted');
    console.log(data);

    const responses = Object.keys(data).map<IResponse>(key => ({
      field: Number(key),
      value: data[key] as string
    }));

    this._responsesService
      .post({ responses }, sectionId)
      .subscribe(console.log);
  }
}

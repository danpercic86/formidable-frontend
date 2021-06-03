import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SectionsService } from '@formidable/services';
import { Observable } from 'rxjs';
import { ISection, ISectionMinimal } from '@formidable/models';
import { map } from 'rxjs/operators';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';

interface IState
{
  sections: ISectionMinimal[];
}

@Component({
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss']
})
export class SectionPageComponent
{
  // currentSection$: Observable<ISection>;
  sections: ISectionMinimal[];
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _sectionsService: SectionsService,
    private readonly _breakpointObserver: BreakpointObserver
  )
  {
    this.sections = (history.state as IState).sections;

    // this.currentSection$ = _route.paramMap.pipe(switchMap(params => this._getSection(params)));

    this.stepperOrientation = _breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  submit(data: Record<string, unknown>): void
  {
    console.log('form submitted');
    console.log(data);
  }

  private _getSection(params: ParamMap): Observable<ISection>
  {
    return this._sectionsService.get(params.get('id') as string);
  }

  getSection(id: string): Observable<ISection>
  {
    return this._sectionsService.get(id);
  }

  trackById(index: number, item: ISectionMinimal)
  {
    console.log(item);
    return item.id;
  }
}

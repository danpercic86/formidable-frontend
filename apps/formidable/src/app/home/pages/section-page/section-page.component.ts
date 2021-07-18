import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsService, SectionsService } from '@formidable/services';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { IForm, ISection, ISectionMinimal } from '@formidable/models';
import { map } from 'rxjs/operators';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss']
})
export class SectionPageComponent implements OnInit
{
  sections: ISectionMinimal[];
  stepperOrientation$: Observable<StepperOrientation>;
  currentSection: ISection;
  currentStep = 0;
  loading = true;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _sectionsService: SectionsService,
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _formsService: FormsService
  )
  {
    this.stepperOrientation$ = _breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  async ngOnInit(): Promise<void>
  {
    this.sections = (await this._getForm()).sections;
    await this._fetchCurrentSection();
    this.loading = false;
  }

  submit(data: Record<string, unknown>): void
  {
    console.log('form submitted');
    console.log(data);
  }

  trackById(index: number, item: ISectionMinimal): string
  {
    return item.id;
  }

  async stepSelectionChange(event: StepperSelectionEvent): Promise<void>
  {
    this.currentStep = event.selectedIndex;
    this.loading = true;
    await this._fetchCurrentSection();
    this.loading = false;
  }

  isCurrentSection(sectionId: string): boolean
  {
    return this.sections[this.currentStep].id === sectionId && !this.loading;
  }

  private _getForm(): Promise<IForm>
  {
    const id = this._route.snapshot.paramMap.get('id') as string;
    return lastValueFrom(this._formsService.getByKey(id));
  }

  private async _fetchCurrentSection(): Promise<void>
  {
    if (this.currentStep === this.sections.length)
    {
      this.currentStep--;
      return;
    }

    const sectionId = this.sections[this.currentStep].id;
    this.currentSection = await firstValueFrom(this._sectionsService.get(sectionId));
  }
}

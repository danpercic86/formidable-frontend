import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SectionsService } from '@builder/core';
import { Required } from '@danpercic86/helpful-decorators';
import { Observable, tap } from 'rxjs';
import { ISection } from '@builder/shared';
import { IResponse } from '../../../../form-builder/shared/models/response.model';
import { ResponsesService } from '../../../../form-builder/services/responses.service';

@Component({
  selector: 'formidable-form-step [sectionId]',
  templateUrl: './form-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormStepComponent implements OnInit
{
  @Input() @Required() sectionId!: string;
  section$?: Observable<ISection>;

  constructor(
    private readonly _sectionsService: SectionsService,
    private readonly _responsesService: ResponsesService
  )
  {
  }

  ngOnInit(): void
  {
    this.section$ = this._sectionsService
      .getByKey(this.sectionId)
      .pipe(tap(console.log));
  }

  submit(data: Record<string, unknown>): void
  {
    console.log(data);

    const responses = Object.keys(data).map<IResponse>(key => ({
      field: Number(key),
      value: data[key] as string
    }));

    this._responsesService.post({ responses }, this.sectionId).subscribe(console.log);
  }
}

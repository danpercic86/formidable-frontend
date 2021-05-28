import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SectionsService } from '@formidable/services';
import { Observable } from 'rxjs';
import { ISection } from '@formidable/models';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss']
})
export class SectionPageComponent
{
  section$: Observable<ISection>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _sectionsService: SectionsService
  )
  {
    this.section$ = _route.paramMap.pipe(switchMap(params => this._getSection(params)));
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
}

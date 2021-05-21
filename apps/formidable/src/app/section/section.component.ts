import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IField } from '@builder/shared';
import { map } from 'rxjs/operators';
import { SectionsService } from '@formidable/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'formidable-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent
{
  fields$: Observable<IField[]>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _sectionsService: SectionsService
  )
  {
    const id = _route.snapshot.paramMap.get('id') as string;
    this.fields$ = this._sectionsService
      .get(id)
      .pipe(map(section => section.fields));
  }

  submit(data: Record<string, unknown>): void
  {
    console.log('form submitted');
    console.log(data);
  }
}

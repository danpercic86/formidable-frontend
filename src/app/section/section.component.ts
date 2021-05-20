import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IField } from '../form-builder/shared/models';
import { take } from 'rxjs/operators';
import { SectionsService } from '@formidable/services';

@Component({
  selector: 'formidable-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent
{
  fields: IField[] = [];

  constructor(
      private readonly _route: ActivatedRoute,
      private readonly _sectionsService: SectionsService,
  )
  {
    const id = _route.snapshot.paramMap.get('id') as string;
    this._sectionsService.get(id).pipe(take(1)).subscribe(section =>
    {
      this.fields = section.fields;
      console.log(this.fields);
    });
  }

  submit(data: Record<string, unknown>): void
  {
    console.log('form submitted');
    console.log(data);
  }
}

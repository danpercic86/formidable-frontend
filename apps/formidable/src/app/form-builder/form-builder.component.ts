import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IField } from './shared/models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { trackByFn } from './shared/functions';
import { ValidatorsService } from '../core/services/components/validators.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'formidable-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit
{
  @Input() fields: IField[];
  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();
  form: FormGroup;
  loading = false;
  trackById = trackByFn;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _validatorsService: ValidatorsService,
    private readonly _loggerService: NGXLogger
  ) {}

  get value(): Record<string, unknown>
  {
    return this.form.value as Record<string, unknown>;
  }

  ngOnInit(): void
  {
    this.form = this._createFormGroup();
    this._loggerService.debug('Form created: ', this.form);
  }

  onSubmit(event: Event | Record<string, unknown>): void
  {
    this.loading = true;
    if (event instanceof Event)
    {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.form.valid)
    {
      this.formSubmit.emit(this.form.value);
    }
    else
    {
      this._validatorsService.validate(this.form);
    }

    this.loading = false;
  }

  private _createFormGroup(): FormGroup
  {
    const group = this._formBuilder.group({});
    this.fields?.forEach(field =>
    {
      group.addControl(field.name, this._createControl(field));
    });
    return group;
  }

  private _createControl({ validators, name }: IField): FormControl
  {
    return this._formBuilder.control(name, ValidatorsService.compose(validators));
  }
}

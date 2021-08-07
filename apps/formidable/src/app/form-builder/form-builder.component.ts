import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { IField, trackBy } from '@builder/shared';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ValidatorsService } from '@builder/core';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject } from 'rxjs';
import { Required } from './shared/decorators/required.decorator';
import { Set } from 'immutable';

@Component({
  selector: 'formidable-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderComponent implements OnInit
{
  @Input() @Required() fields!: Set<IField>;
  @Input() formControl?: (field: IField) => string;
  @Input() buttonText?: string;
  @Input() buttonTemplate?: TemplateRef<unknown>;
  @Output() readonly formSubmit = new EventEmitter<Record<string, unknown>>();
  form!: FormGroup;
  readonly loading$ = new BehaviorSubject(false);
  readonly trackById = trackBy();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _validatorsService: ValidatorsService,
    private readonly _logger: NGXLogger
  )
  {
  }

  get value(): Record<string, unknown>
  {
    return this.form.value as Record<string, unknown>;
  }

  ngOnInit(): void
  {
    this.form = this._createFormGroup();
    this._logger.debug('Form created: ', this.form);
  }

  onSubmit(event: Event): void
  {
    this.loading$.next(true);
    event.preventDefault();
    event.stopPropagation();

    if (this.form.valid)
    {
      this.formSubmit.emit(this.value);
    }
    else
    {
      this._validatorsService.validate(this.form);
    }

    this.loading$.next(false);
  }

  controlNameOf = (field: IField): string => this.formControl?.(field) ?? field.name;

  private _createFormGroup(): FormGroup
  {
    const group = this._formBuilder.group({});
    this.fields.forEach(field =>
    {
      group.addControl(this.controlNameOf(field), this._createControl(field));
    });
    return group;
  }

  private _createControl({ validators, value }: IField): FormControl
  {
    return this._formBuilder.control(value, ValidatorsService.compose(validators));
  }
}

import { InjectionToken } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from './models/field.model';

export const FIELD = new InjectionToken<IField>('field');
export const FORM = new InjectionToken<FormGroup>('form');

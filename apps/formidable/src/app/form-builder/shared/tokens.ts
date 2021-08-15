import { InjectionToken } from '@angular/core';
import { IField } from './models/field.model';
import { FormGroup } from '@angular/forms';

export const FIELD = new InjectionToken<IField>('field');
export const FORM = new InjectionToken<FormGroup>('form');

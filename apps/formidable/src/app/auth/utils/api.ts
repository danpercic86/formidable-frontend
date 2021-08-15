import { environment } from '@formidable/env';

export class Api {
  static get authUrl(): string {
    return `${environment.apiUrl}auth`;
  }

  static get tokenUrl(): string {
    return `${Api.authUrl}/token`;
  }
}

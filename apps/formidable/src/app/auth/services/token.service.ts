import { Injectable } from '@angular/core';
import { IToken } from '../models/token';

const ACCESS_TOKEN = 'formidable_access_token';
const REFRESH_TOKEN = 'formidable_refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService
{
  get rawToken(): string | null
  {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  set rawToken(token: string | null)
  {
    if (token === null) return;
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  get token(): IToken | null
  {
    if (!this.rawToken) return null;
    return <IToken>JSON.parse(atob(this.rawToken.split('.')[1]));
  }

  get refreshToken(): IToken | null
  {
    if (!this.rawRefreshToken) return null;
    return <IToken>JSON.parse(atob(this.rawRefreshToken.split('.')[1]));
  }

  get rawRefreshToken(): string | null
  {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  set rawRefreshToken(refreshToken: string | null)
  {
    if (refreshToken === null) return;
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void
  {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken(): void
  {
    localStorage.removeItem(REFRESH_TOKEN);
  }

  removeTokens(): void
  {
    this.removeToken();
    this.removeRefreshToken();
  }
}

import { Injectable } from '@angular/core';
import { IToken } from '../models/token';

const ACCESS_TOKEN = 'formidable_access_token';
const REFRESH_TOKEN = 'formidable_refresh_token';

const decode = (token: string | null): IToken | null =>
{
  if (!token) return null;
  return JSON.parse(atob(token.split('.')[1])) as IToken;
};

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
    return decode(this.rawToken);
  }

  get refreshToken(): IToken | null
  {
    return decode(this.rawRefreshToken);
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

  removeToken = (): void => localStorage.removeItem(ACCESS_TOKEN);

  removeRefreshToken = (): void => localStorage.removeItem(REFRESH_TOKEN);

  removeTokens(): void
  {
    this.removeToken();
    this.removeRefreshToken();
  }
}

import { Injectable } from '@angular/core';
import { IToken } from '../models/token';

const ACCESS_TOKEN = 'formidable_access_token';
const REFRESH_TOKEN = 'formidable_refresh_token';

const decode = (token: string | null): IToken | null => {
  if (!token) return null;
  return JSON.parse(atob(token.split('.')[1])) as IToken;
};

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  static get rawToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  static set rawToken(token: string | null) {
    if (token === null) return;
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  static get token(): IToken | null {
    return decode(this.rawToken);
  }

  static get refreshToken(): IToken | null {
    return decode(this.rawRefreshToken);
  }

  static get rawRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  static set rawRefreshToken(refreshToken: string | null) {
    if (refreshToken === null) return;
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  static get accessTokenTimeout(): number {
    if (!TokenService.token?.exp) return 0;

    const expires = new Date(TokenService.token.exp * 1000);
    return expires.getTime() - Date.now() - 60 * 1000;
  }

  static removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  static removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
  }

  static removeTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
  }
}

import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService
{
  get token(): string
  {
    return localStorage.getItem(ACCESS_TOKEN) as string;
  }

  set token(token: string)
  {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  get refreshToken(): string | null
  {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  set refreshToken(refreshToken: string | null)
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

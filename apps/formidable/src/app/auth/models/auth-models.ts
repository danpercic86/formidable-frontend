import { IUser } from './user';

export interface ILoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface ILoginResponse {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly user: IUser;
}

export interface IRegisterRequest {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly password1: string;
  readonly password2: string;
}

export interface IRefreshTokenResponse {
  readonly access: string;
}

export interface IVerifyTokenRequest {
  readonly token: string;
}

import { IUser } from './user';

export interface ILoginRequest
{
    email: string;
    password: string;
}

export interface ILoginResponse
{
    access_token: string;
    refresh_token: string;
    user: IUser;
}

export interface IRegisterRequest
{
    first_name: string;
    last_name: string;
    email: string;
    password1: string;
    password2: string;
}

export interface IRefreshTokenResponse
{
    access: string;
}

export interface IVerifyTokenRequest
{
    token: string;
}

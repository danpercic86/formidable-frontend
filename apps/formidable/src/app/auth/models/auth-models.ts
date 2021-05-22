import { IUser } from './user';

export interface ILoginRequestData
{
    email: string;
    password: string;
}

export interface ILoginResponseData
{
    access_token: string;
    refresh_token: string;
    user: IUser;
}

export interface IRegisterRequestData
{
    first_name: string;
    last_name: string;
    email: string;
    password1: string;
    password2: string;
}

export interface IRefreshTokenResponseData
{
    access: string;
}

export interface IVerifyTokenRequestData
{
    token: string;
}

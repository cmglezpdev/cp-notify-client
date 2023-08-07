import { IUser } from './user.d';

export interface ISignInApiResponse {
    user: IUser;
    token: string;
}

export interface ISignInApiRequest {
    email: string;
    password: string;
}

export interface SignUpApiResponse extends ISignInApiResponse { }

export interface SignUpApiRequest extends ISignInApiRequest {
    name: string;
    repeatPassword: string;
}
export interface ILogInPayload {
    email: string;
    password: string
}

export interface ISignUpPayload {
    email: string;
    password: string;
}

export interface IForgotPasswordPayload {
    email: string;
}
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

export interface IAddNetwork {
    rpc_url: string,
    currency_symbol: string,
    block_explorer_url: string | null,
}
export type GenericType<T> = T

export interface ISignInFormikValues {
  login: string;
  password: string;
}

export interface ISignUpFormikValues extends ISignInFormikValues {
  userName: string;
  confirmPassword: string;
  check: boolean;
}

export interface IResponseType {
  name: string
  avatarUrl: string
  token: string
}

export enum RespStatusEnum {
  Success = 200,
  Error = 401,
}

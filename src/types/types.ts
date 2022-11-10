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

// REQUESTS TYPES ---------------------------
export interface ISignInRequest extends ISignInFormikValues{}
export type ISignUpRequest = Omit<ISignUpFormikValues, 'confirmPassword' |  'check'>
//  -----------------------------------

export interface IResponseType {
  name: string
  avatarUrl: string
  token: string
}

export enum RespStatusEnum {
  SUCCESS = 200,
  UNREGISTRED = 401,
  EXISTS = 409,
}

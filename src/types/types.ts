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

// AUTH -------------------------------
export interface ISignInRequest extends ISignInFormikValues{}
export type ISignUpRequest = Omit<ISignUpFormikValues, 'confirmPassword' |  'check'>
// ---------------------------------------

// TEAMS
export interface INewTeamValues {
  name: string;
  division: string;
  conference: string;
  foundationYear: number | string;
  imageUrl: string;
}
// ---------------------------------------

//  -----------------------------------

export interface IAuthResponseType {
  name: string
  avatarUrl: string
  token: string
}

export enum RespStatusEnum {
  SUCCESS = 200,
  UNREGISTRED = 401,
  EXISTS = 409,
}

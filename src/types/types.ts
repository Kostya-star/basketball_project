// AUTH TYPES
export interface ISignInFormikValues {
  login: string;
  password: string;
}

export interface ISignUpFormikValues extends ISignInFormikValues {
  userName: string;
  confirmPassword: string;
  check: boolean;
}
// ----------------------------------


// TEAMS TYPES--------------------------
export interface INewTeamValues {
  name: string;
  division: string;
  conference: string;
  foundationYear: number | string;
  imageUrl: string;
}

export interface ITeamData extends INewTeamValues{
  id: number;
}

export interface ITeamState {
  data: ITeamData[];
  count: number;
  page: number;
  size: number;
}
// -----------------------------

// PLAYERS TYPES ---------------------------
export interface IPlayerState {
  name: string,
  number: number,
  position: string,
  team: number,
  birthday: number,
  height: number,
  weight: number,
  avatarUrl: string,
  id: number
}
// ----------------------------------


// REQUESTS TYPES ---------------------------

// AUTH -------------------------------
export interface ISignInRequest extends ISignInFormikValues{}
export type ISignUpRequest = Omit<ISignUpFormikValues, 'confirmPassword' |  'check'>
// ---------------------------------------

// TEAMS
export interface IGetTeamsResponse extends ITeamState{}
export interface ITeamAddResponse extends ITeamData{}
export interface INewTeamValuesRequest extends INewTeamValues{}
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

// SELECT COMPONENT TYPES

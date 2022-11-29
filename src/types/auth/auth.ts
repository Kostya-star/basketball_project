export interface ISignInFormikValues {
  login: string;
  password: string;
}

export interface ISignUpFormikValues extends ISignInFormikValues {
  userName: string;
  confirmPassword: string;
  check: boolean;
}
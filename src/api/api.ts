import {client} from './baseRequest'
import { ISignInFormikValues, ISignUpFormikValues } from './../types/types';


interface ISignInRequest extends ISignInFormikValues{}

type ISignUpRequest = Omit<ISignUpFormikValues, 'confirmPassword' |  'check'>


interface IResponseType {
  name: string
  avatarUrl: string
  token: string
}

export const authAPI = {
  async signIn(signInUserData: ISignInRequest) {
    return await client.post<IResponseType>(`Auth/SignIn`, signInUserData);
  },

  async signUp(signUpUserData: ISignUpRequest) {
    return await client.post<IResponseType>(`Auth/SignUp`, signUpUserData);
  },
};

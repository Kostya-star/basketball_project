import {client} from './baseRequest'
import { IResponseType, ISignInFormikValues, ISignUpFormikValues } from './../types/types'


interface ISignInRequest extends ISignInFormikValues{}

type ISignUpRequest = Omit<ISignUpFormikValues, 'confirmPassword' |  'check'>


export const authAPI = {
  async signIn(signInUserData: ISignInRequest) {
    return await client.post<IResponseType>(`Auth/SignIn`, signInUserData);
  },

  async signUp(signUpUserData: ISignUpRequest) {
    return await client.post<IResponseType>(`Auth/SignUp`, signUpUserData);
  },
};

export const authTeam = {
  async getTeams() {
    return await client.get(`/Team/GetTeams`)
  }
}

import {client} from './baseRequest'
import { IResponseType, ISignInFormikValues, ISignInRequest, ISignUpFormikValues, ISignUpRequest } from './../types/types'


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

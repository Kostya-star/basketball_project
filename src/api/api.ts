import {client} from './baseRequest'
import { IAuthResponseType, ISignInFormikValues, ISignInRequest, ISignUpFormikValues, ISignUpRequest } from './../types/types'


export const authAPI = {
  async signIn(signInUserData: ISignInRequest) {
    return await client.post<IAuthResponseType>(`Auth/SignIn`, signInUserData);
  },

  async signUp(signUpUserData: ISignUpRequest) {
    return await client.post<IAuthResponseType>(`Auth/SignUp`, signUpUserData);
  },
};


export const teamsAPI = {
  async getTeams() {
    return await client.get(`/Team/GetTeams`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`
      }
    })
  },
  async saveImage(photoFile: File) {
    const data = new FormData();  
    data.append('file', photoFile)

    return await client.post('Image/SaveImage', data, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

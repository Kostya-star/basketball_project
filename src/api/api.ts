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


export const teamsAPI = {
  async getTeams() {
    return await client.get(`/Team/GetTeams`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`
      }
    })
  },
  async saveImage(photoFile: any) {
    const formData = new FormData();    
    formData.append('image', photoFile)

    return await client.post('Image/SaveImage', formData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

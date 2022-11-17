import {client} from './baseRequest'
import { IAuthResponseType, INewTeamValues, ISignInFormikValues, ISignInRequest, ISignUpFormikValues, ISignUpRequest } from './../types/types'


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
    return await client.get(`Team/GetTeams`)
  },
  async saveImage(photoFile: File) {
    const data = new FormData();  
    data.append('file', photoFile)

    return await client.post<string>('Image/SaveImage', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async addTeam(values : INewTeamValues) {
    return await client.post('Team/Add', values)
  }
}

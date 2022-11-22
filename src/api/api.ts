import {client} from './baseRequest'
import { IAuthResponseType, IGetTeamsResponse, INewTeamValuesRequest, ISignInRequest, ISignUpRequest, ITeamAddResponse, ITeamData, ITeamState } from './../types/types'


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
    return await client.get<IGetTeamsResponse>(`Team/GetTeams`)
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

  async addTeam(values : INewTeamValuesRequest) {
    return await client.post<ITeamAddResponse>('Team/Add', values)
  },

  async deleteTeam(id: number) {
    return await client.delete(`Team/Delete?id=${id}`)
  }
}

export const playersAPI = {
  async getPlayers() {
    return await client.get('Player/GetPlayers')
  }
}

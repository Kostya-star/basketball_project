import { client } from './baseRequest';
import { ISignInRequest } from '../types/auth/SignInRequest';
import { IAuthResponseType } from '../types/auth/authResp';
import { ISignUpRequest } from '../types/auth/SignUpRequest';
import { IGetTeamsResponse } from '../types/teams/getTeamsResp';
import { INewTeamValuesRequest } from '../types/teams/addTeamRequest';
import { IGetPlayersResponse } from '../types/players/getPlayersResp';
import { IAddPLayerRequest } from '../types/players/addPLayerRequest';
import { IDeleteTeamRequest } from '../types/teams/deleteTeamRequest';
import { IDeletePlayerRequest } from '../types/players/deletePlayerRequest';
import { IAddTeamResponse } from '../types/teams/addTeamResp';
import { IDeleteTeamResponse } from '../types/teams/deleteTeamResp';
import { IAddPlayerResponse } from '../types/players/addPlayerResp';
import { IDeletePlayerResponse } from '../types/players/deletePlayerResp';


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
    return await client.get<IGetTeamsResponse>(`Team/GetTeams`);
  },

  async addTeam(values: INewTeamValuesRequest) {
    return await client.post<IAddTeamResponse>('Team/Add', values);
  },

  async deleteTeam({id}: IDeleteTeamRequest) {
    return await client.delete<IDeleteTeamResponse>(`Team/Delete?id=${id}`);
  }
};

export const playersAPI = {
  async getPlayers() {
    return await client.get<IGetPlayersResponse>('Player/GetPlayers');
  },

  async getPositions() {
    return await client.get<string[]>('Player/GetPositions');
  },

  async addPlayer(newPlayer: IAddPLayerRequest) {
    return await client.post<IAddPlayerResponse>('Player/Add', newPlayer);
  },
  
  async deletePlayer({id}: IDeletePlayerRequest) {
    return await client.delete<IDeletePlayerResponse>(`Player/Delete?id=${id}`);
  }
};

export const imageAPI = {
  async saveImage(photoFile: File) {
    const data = new FormData();
    data.append('file', photoFile);

    return await client.post<string>('Image/SaveImage', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

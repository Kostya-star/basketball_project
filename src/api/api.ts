import { IAuthResponseType } from 'types/auth/authResp';
import { ISignInRequest } from 'types/auth/SignInRequest';
import { ISignUpRequest } from 'types/auth/SignUpRequest';
import { IPlayersParamsGetRequest, ITeamsParamsGetRequest } from 'types/IBaseParamsGetRequest';
import { IAddPLayerRequest } from 'types/players/addPLayerRequest';
import { IAddPlayerResponse } from 'types/players/addPlayerResp';
import { IDeletePlayerRequest } from 'types/players/deletePlayerRequest';
import { IDeletePlayerResponse } from 'types/players/deletePlayerResp';
import { IGetPlayerResponse } from 'types/players/getPlayerResponse';
import { IGetPlayersResponse } from 'types/players/getPlayersResp';
import { IUpdatePlayerRequest } from 'types/players/updatePlayerRequest';
import { IUpdatePlayerResponse } from 'types/players/updatePlayerResponse';
import { INewTeamValuesRequest } from 'types/teams/addTeamRequest';
import { IAddTeamResponse } from 'types/teams/addTeamResp';
import { IDeleteTeamRequest } from 'types/teams/deleteTeamRequest';
import { IDeleteTeamResponse } from 'types/teams/deleteTeamResp';
import { IGetTeamResponse } from 'types/teams/getTeamResp';
import { IGetTeamsResponse } from 'types/teams/getTeamsResp';
import { IUpdateTeamRequest } from 'types/teams/updateTeamRequest';
import { IUpdateTeamResponse } from 'types/teams/updateTeamResponse';
import { client } from './baseRequest';

export const authAPI = {
  async signIn(signInUserData: ISignInRequest) {
    return await client.post<IAuthResponseType>(`Auth/SignIn`, signInUserData);
  },

  async signUp(signUpUserData: ISignUpRequest) {
    return await client.post<IAuthResponseType>(`Auth/SignUp`, signUpUserData);
  },
};

export const teamsAPI = {
  async getTeams(teamsParams?: ITeamsParamsGetRequest) {
    return await client.get<IGetTeamsResponse>('Team/GetTeams', {
      params: {
        Page: teamsParams?.Page,
        PageSize: teamsParams?.PageSize,
        ...(teamsParams?.Name ? { Name: teamsParams?.Name } : {}),
      },
    });
  },

  async getTeam(id: number) {
    return await client.get<IGetTeamResponse>(`Team/Get?id=${id}`);
  },

  async addTeam(values: INewTeamValuesRequest) {
    return await client.post<IAddTeamResponse>('Team/Add', values);
  },

  async editTeam(newValues: IUpdateTeamRequest) {
    return await client.put<IUpdateTeamResponse>(`Team/Update`, newValues);
  },

  async deleteTeam({ id }: IDeleteTeamRequest) {
    return await client.delete<IDeleteTeamResponse>(`Team/Delete?id=${id}`);
  },
};

export const playersAPI = {
  async getPlayers(playersParams?: IPlayersParamsGetRequest) {
    return await client.get<IGetPlayersResponse>(`Player/GetPlayers`, {
      params: {
        Page: playersParams?.Page,
        PageSize: playersParams?.PageSize,
        ...(playersParams?.Name ? { Name: playersParams?.Name } : {}),
        ...(playersParams?.TeamIds ? { TeamIds: playersParams?.TeamIds } : {}),
      },
    });
  },

  async getPlayer(id: number) {
    return await client.get<IGetPlayerResponse>(`Player/Get?id=${id}`);
  },

  async getPositions() {
    return await client.get<string[]>('Player/GetPositions');
  },

  async addPlayer(newPlayer: IAddPLayerRequest) {
    return await client.post<IAddPlayerResponse>('Player/Add', newPlayer);
  },

  async editPlayer(newPlayer: IUpdatePlayerRequest) {
    return await client.put<IUpdatePlayerResponse>('Player/Update', newPlayer);
  },

  async deletePlayer({ id }: IDeletePlayerRequest) {
    return await client.delete<IDeletePlayerResponse>(`Player/Delete?id=${id}`);
  },
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

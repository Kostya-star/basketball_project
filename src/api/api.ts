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
import { IPlayersParamsGetRequest, ITeamsParamsGetRequest } from './../types/IBaseParamsGetRequest';


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
    
    const currentPage = teamsParams?.Page ? `?Page=${teamsParams.Page}` : '';
    const pageSize = teamsParams?.PageSize ? `&PageSize=${teamsParams.PageSize}` : '';
    const teamName = teamsParams?.Name ? `&Name=${teamsParams.Name}` : '';

    return await client.get<IGetTeamsResponse>(
      `Team/GetTeams${currentPage}${pageSize}${teamName}`
    );
  },

  async addTeam(values: INewTeamValuesRequest) {
    return await client.post<IAddTeamResponse>('Team/Add', values);
  },

  async deleteTeam({ id }: IDeleteTeamRequest) {
    return await client.delete<IDeleteTeamResponse>(`Team/Delete?id=${id}`);
  },
};

export const playersAPI = {
  async getPlayers(playersParams?: IPlayersParamsGetRequest) {

    const currentPage = playersParams?.Page ? `?Page=${playersParams.Page}` : ''
    const pageSize = playersParams?.PageSize ? `&PageSize=${playersParams.PageSize}` : ''
    const teamName = playersParams?.Name ? `&Name=${playersParams.Name}` : '';
    const TeamIds = playersParams?.TeamIds ? `&TeamIds=${playersParams.TeamIds}` : ''

    return await client.get<IGetPlayersResponse>(
      `Player/GetPlayers${currentPage}${pageSize}${teamName}${TeamIds}`
    );
  },

  async getPositions() {
    return await client.get<string[]>('Player/GetPositions');
  },

  async addPlayer(newPlayer: IAddPLayerRequest) {
    return await client.post<IAddPlayerResponse>('Player/Add', newPlayer);
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

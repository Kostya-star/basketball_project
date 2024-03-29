import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imageAPI, teamsAPI } from 'api/api';
import { RespStatusEnum } from 'types/enum';
import { ITeamsParamsGetRequest } from 'types/IBaseParamsGetRequest';
import { INewTeamValues, ITeamState } from 'types/teams/teams';
import { IUpdateTeamRequest } from 'types/teams/updateTeamRequest';
import { AppDispatch } from '../store';

const initialState = {
  data: [],
  count: 0,
  page: 1,
  size: 6,
} as ITeamState;

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, { payload }: PayloadAction<ITeamState>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export const fetchTeams =
  (teamsParams?: ITeamsParamsGetRequest) => async (dispatch: AppDispatch) => {
    const resp = await teamsAPI.getTeams(teamsParams);
    if (resp && resp.status === RespStatusEnum.SUCCESS) {
      dispatch(setTeams(resp.data));
    }
    return resp;
  };

export const getTeam = (id: number) => async () => {
  if (id) {
    const resp = await teamsAPI.getTeam(id);
    return resp;
  }
};

export const addPhoto = (image: File | null) => async () => {
  if (image) {
    const resp = await imageAPI.saveImage(image).catch((error) => {
      console.log(error);
    });

    if (resp && resp.status === RespStatusEnum.SUCCESS) {
      return resp.data;
    }
  }
};

export const createTeam = (teamValues: INewTeamValues) => async () => {
  const resp = await teamsAPI.addTeam(teamValues);
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    return resp.data;
  }
};

export const editTeam = (newTeamValues: IUpdateTeamRequest) => async () => {
  const resp = await teamsAPI.editTeam(newTeamValues).catch((error) => {
    console.log(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    return resp;
  }
};

export const removeTeam = (id: number) => async () => {
  const resp = await teamsAPI.deleteTeam({ id });
  return resp;
};

export default teamsSlice.reducer;

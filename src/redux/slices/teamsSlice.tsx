import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imageAPI, teamsAPI } from '../../api/api';
import { INewTeamValues, ITeamData, ITeamState } from '../../types/teams/teams';
import { RespStatusEnum } from '../../types/enum';
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
        ...payload
      };
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export const fetchTeams = (currentPage?: number, pageSize?: number, value?: string) => async (dispatch: AppDispatch) => {
  if(currentPage && pageSize) {
    const resp = await teamsAPI.getTeams(currentPage, pageSize, value)
    if (resp && resp.status === RespStatusEnum.SUCCESS) {
      dispatch(setTeams(resp.data));
    }
    return resp;
  } else {
    const resp = await teamsAPI.getTeams()
    if (resp && resp.status === RespStatusEnum.SUCCESS) {
      dispatch(setTeams(resp.data));
    }
    return resp;
  }
};

export const createTeam =
  (teamValues: INewTeamValues, image: File | null) => async (dispatch: AppDispatch) => {
    if (image) {
      const imageResp = await imageAPI.saveImage(image).catch((error) => {
        alert('Error when uploading photo');
        console.log(error);
      });
      if (imageResp && imageResp.status === RespStatusEnum.SUCCESS) {
        const imageUrl = imageResp.data;
        teamValues.imageUrl = imageUrl;

        const resp = await teamsAPI.addTeam(teamValues)
        return resp;
      }
    }
  };

export const removeTeam = (id: number) => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.deleteTeam({id}).catch((error) => {
    console.log(error);
    alert('Error when deleting the team');
  });

  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    // void dispatch(fetchTeams());
  }
};

export default teamsSlice.reducer;

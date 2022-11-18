import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { teamsAPI } from '../../api/api';
import { INewTeamValues, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';

interface ITeamData {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id: number;
}

export interface ITeamState {
  teams: ITeamData[];
  count: number;
  page: number;
  size: number;
}

const initialState: ITeamState = {
  teams: [
    {
      name: '',
      foundationYear: 0,
      division: '',
      conference: '',
      imageUrl: '',
      id: 0,
    },
  ],
  count: 0,
  page: 0,
  size: 0,
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<ITeamState>) {
      state.teams = action.payload.teams;
      state.count = action.payload.count;
      state.page = action.payload.page;
      state.size = action.payload.size;
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export const fetchTeams = () => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.getTeams().catch((error) => {
    alert('error when fetching teams');
    console.log(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    const { data } = resp;
    if (JSON.stringify(data) !== '[]') {
      dispatch(setTeams(data));
    }
  }
};

export const createTeam = (teamValues: INewTeamValues, image: File | null) => async (dispatch: AppDispatch) => {
    if (image) {
      const imageResp = await teamsAPI.saveImage(image).catch((error) => {
        alert('Error when uploading photo');
        console.log(error);
      });
      if (imageResp && imageResp.status === RespStatusEnum.SUCCESS) {

        const imageUrl = imageResp.data
        teamValues.imageUrl = imageUrl
        
        const resp = await teamsAPI.addTeam(teamValues).catch((error) => {
          if (error && error.response.status === RespStatusEnum.EXISTS) {
            alert('This team already exists');
          }
        });
        if (resp && resp.status === RespStatusEnum.SUCCESS) {
          alert('The team is created successfully');
        }
      }
    }
  };

export default teamsSlice.reducer;

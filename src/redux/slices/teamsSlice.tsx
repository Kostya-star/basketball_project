import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { teamsAPI } from '../../api/api';
import { RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';

export interface ITeamState {
  teams: [] | Array<{}>
  teamImg: File | null
}

const initialState: ITeamState = {
  teams: [],
  teamImg: null
};


export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Array<{}> | []>) {
      state.teams = action.payload
    },
    saveImage(state, action) {
      state.teamImg = action.payload
    }
  },
});

export const { setTeams, saveImage } = teamsSlice.actions;


export const fetchTeams = () => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.getTeams().catch(error => {
    alert('error when fetching teams')
    console.log(error);
  })
  const {data} = resp?.data
  if(JSON.stringify(data) !== '[]') {
    dispatch(setTeams(data))
  }
}

export const setTeamImage = (photoFile: File) => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.saveImage(photoFile).catch(error => {
    alert('Error when uploading photo')
    console.log(error);
  })
  if(resp && resp.status === RespStatusEnum.SUCCESS) {
    dispatch(saveImage(photoFile))
  }
}

export default teamsSlice.reducer;

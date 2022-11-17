import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { teamsAPI } from '../../api/api';
import { INewTeamValues, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';


interface ITeamData {
  name: string,
  foundationYear: number,
  division: string,
  conference: string,
  imageUrl: string,
  id: number,
}

export interface ITeamState {
  teams: ITeamData[]
  count: number,
  page: number,
  size: number,
  teamImg: File | null
  imageUrl: string 
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
    } as ITeamData
  ],
  count: 0,
  page: 0,
  size: 0,
  teamImg: null,
  imageUrl: ''
};


export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<{teams: ITeamData[], count: number, page: number, size: number}>) {
      state.teams = action.payload.teams
      state.count = action.payload.count
      state.page = action.payload.page
      state.size = action.payload.size
    },
    saveImage(state, action: PayloadAction<{file: File, imageUrl: string}>) {
      state.teamImg = action.payload.file
      state.imageUrl =  action.payload.imageUrl
    },
  },
});

export const { setTeams, saveImage } = teamsSlice.actions;


export const fetchTeams = () => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.getTeams().catch(error => {
    alert('error when fetching teams')
    console.log(error);
  })
  if(resp && resp.status === RespStatusEnum.SUCCESS) {
    const {data} = resp
    if(JSON.stringify(data) !== '[]') {
      dispatch(setTeams({ teams: data.data, count: data.count, page: data.page, size: data.size }))
    }
  }
}

export const setTeamImage = (photoFile: File) => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.saveImage(photoFile).catch(error => {
    alert('Error when uploading photo')
    console.log(error);
  })
  if(resp && resp.status === RespStatusEnum.SUCCESS) {
    dispatch(saveImage({file: photoFile, imageUrl: resp.data}))
  }
}

export const createTeam = (teamValues: INewTeamValues) => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.addTeam(teamValues).catch((error) => {
    if(error && error.response.status === RespStatusEnum.EXISTS) {
      alert('This team already exists')
    }
  })
  if(resp && resp.status === RespStatusEnum.SUCCESS) {
    alert('The team is created successfully')
  }
} 

export default teamsSlice.reducer;

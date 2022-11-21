import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { teamsAPI } from '../../api/api';
import { INewTeamValues, ITeamData, ITeamState, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';


const initialState: ITeamState = {
  data: [
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
  isNavigateTeams: false
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<ITeamState>) {
      state.data = action.payload.data;
      state.count = action.payload.count;
      state.page = action.payload.page;
      state.size = action.payload.size;
    },
    toggleNavigate(state, action: PayloadAction<boolean>) {
      state.isNavigateTeams = action.payload 
    }
  },
});

export const { setTeams, toggleNavigate } = teamsSlice.actions;

export const fetchTeams = () => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.getTeams().catch((error) => {
    alert('error when fetching teams');
    console.log(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    console.log(resp);
    
    if (JSON.stringify(resp.data.data) !== '[]') {
      dispatch(setTeams(resp.data));
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
          // alert('The team is created successfully');
          dispatch(toggleNavigate(true))
        }
      }
    }
  };

export default teamsSlice.reducer;

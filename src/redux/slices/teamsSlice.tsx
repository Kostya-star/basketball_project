import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { teamsAPI } from '../../api/api';
import { INewTeamValues, ITeamData, ITeamState, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';
import { toggleLoading } from './loadingSlice';

const initialState: ITeamState = {
  data: [],
  count: 0,
  page: 0,
  size: 0,
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
    deleteTeam(state, {payload}: PayloadAction<number>) {
      const teamId = payload
      state.data = state.data.filter(team => team.id !== teamId)
    }
  },
});

export const { setTeams, deleteTeam } = teamsSlice.actions;

export const fetchTeams = () => async (dispatch: AppDispatch) => {
  const resp = await teamsAPI.getTeams().catch((error) => {
    alert('error when fetching teams');
    console.log(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    
    if (JSON.stringify(resp.data.data) !== '[]') {
      dispatch(setTeams(resp.data));
    } 
  }
  return resp
};

export const createTeam =
  (teamValues: INewTeamValues, image: File | null) => async (dispatch: AppDispatch) => {
    dispatch(toggleLoading(true));
    if (image) {
      const imageResp = await teamsAPI.saveImage(image).catch((error) => {
        alert('Error when uploading photo');
        console.log(error);
      });
      if (imageResp && imageResp.status === RespStatusEnum.SUCCESS) {
        const imageUrl = imageResp.data;
        teamValues.imageUrl = imageUrl;

        const resp = await teamsAPI.addTeam(teamValues).catch((error) => {
          if (error && error.response.status === RespStatusEnum.EXISTS) {
            alert('This team already exists');
          }
        });
        if (resp && resp.status === RespStatusEnum.SUCCESS) {
          alert('The team is created successfully');
        }
        dispatch(toggleLoading(false));
        return resp
      }
    }
  };

  export const removeTeam = (id: number) => async(dispatch: AppDispatch) => {
    const resp = await teamsAPI.deleteTeam(id).catch(error => {
      console.log(error);
      alert('Error when deleting the team')
    })

    if(resp && resp.status === RespStatusEnum.SUCCESS) {
      dispatch(deleteTeam(id))
      alert('The team was successfully deleted')
    }
  }

export default teamsSlice.reducer;

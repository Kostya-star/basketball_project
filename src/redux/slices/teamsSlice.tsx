import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imageAPI, teamsAPI } from '../../api/api';
import { INewTeamValues, ITeamData, ITeamState, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';
import { toggleLoading } from './loadingSlice';

const initialState = {} as ITeamState

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, {payload}: PayloadAction<ITeamState>) {
      return payload
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
    dispatch(setTeams(resp.data));
  }
  return resp
};

export const createTeam =
  (teamValues: INewTeamValues, image: File | null) => async (dispatch: AppDispatch) => {
    dispatch(toggleLoading(true));
    if (image) {
      const imageResp = await imageAPI.saveImage(image).catch((error) => {
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

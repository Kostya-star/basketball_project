import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { teamsAPI } from '../../api/api';
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
      console.log(action.payload);
      
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

// export const setImage = (photoFile: any) => async (dispatch: AppDispatch) => {
//   const resp = await teamsAPI.saveImage(photoFile).catch(error => {
//     alert('Error when uploading photo')
//     console.log(error);
//   })
//   if(resp) {
//     console.log(resp);
//     dispatch(saveImage(resp.data.photos))
//   }
// }

export default teamsSlice.reducer;

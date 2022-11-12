import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITeamState {
  teams: [] | Array<{}>
}

const initialState: ITeamState = {
  teams: []
};


export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Array<{}> | []>) {
      state.teams = action.payload
    }
  },
});


export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;

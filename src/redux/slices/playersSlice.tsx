import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayerState, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';
import { playersAPI, teamsAPI } from './../../api/api';


interface IPlayersSliceState {
  data: IPlayerState[],
  count: number,
  page: number,
  size: number,
  positions: string[]
}

const initialState: IPlayersSliceState = {
  data: [],
  count: 0,
  page: 0,
  size: 0,
  positions: []
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<IPlayersSliceState>){
      state.data = action.payload.data
    },
    setPositions(state, {payload}: PayloadAction<string[]>) {
      state.positions = payload
    }
  },
});

export const {setPlayers, setPositions} = playersSlice.actions;

export const fetchPlayers = () => async (dispatch: AppDispatch) => {
  const resp = await playersAPI.getPlayers().catch(error => {
    console.log(error);
    alert('Error ocured when fetching players')
  })
  if(resp && resp.status === RespStatusEnum.SUCCESS) {
    dispatch(setPlayers(resp.data))
  }
}

export const getPositions = () => async(dispatch: AppDispatch) => {
  const resp = await playersAPI.getPositions().catch(error => {
    console.log(error);
    alert(error)
  })
  if(resp && resp.status === RespStatusEnum.SUCCESS) {
    dispatch(setPositions(resp.data))
  } 
}

export default playersSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';
import { playersAPI } from './../../api/api';


interface IPlayerState {
  name: string,
  number: number,
  position: string,
  team: number,
  birthday: number,
  height: number,
  weight: number,
  avatarUrl: string,
  id: number
}

interface IPlayersSliceState {
  data: IPlayerState[],
  count: number,
  page: number,
  size: number
}

const initialState: IPlayersSliceState = {
  data: [
    {
      name: '',
      number: 0,
      position: '',
      team: 0,
      birthday: 0,
      height: 0,
      weight: 0,
      avatarUrl: '',
      id: 0
    }
  ],
  count: 0,
  page: 0,
  size: 0
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<IPlayersSliceState>){
      state.data = action.payload.data
    }
  },
});

export const {setPlayers} = playersSlice.actions;

export const fetchPlayers = () => async (dispatch: AppDispatch) => {
  const resp = await playersAPI.getPlayers().catch(error => {
    console.log(error);
    alert('Error ocured when fetching players')
  })
  if(resp && resp.status === RespStatusEnum.SUCCESS) {
    dispatch(setPlayers(resp.data))
  }
}

export default playersSlice.reducer;

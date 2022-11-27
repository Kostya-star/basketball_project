import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddPLayerRequest, IPlayerState, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';
import { imageAPI, playersAPI, teamsAPI } from './../../api/api';

interface IPlayersData {
  data: IPlayerState[];
  count: number;
  page: number;
  size: number;
}

interface IPlayersSliceState {
  playersData: IPlayersData;
  positions: string[];
}

const initialState: IPlayersSliceState = {
  playersData: {} as IPlayersData,
  positions: [],
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<IPlayersData>) {
      state.playersData = action.payload;
    },
    setPositions(state, { payload }: PayloadAction<string[]>) {
      state.positions = payload;
    },
  },
});

export const { setPlayers, setPositions } = playersSlice.actions;

export const fetchPlayers = () => async (dispatch: AppDispatch) => {
  const resp = await playersAPI.getPlayers().catch((error) => {
    console.log(error);
    alert('Error ocured when fetching players');
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    dispatch(setPlayers(resp.data));
  }
};

export const createPlayer =
  (newPlayer: IAddPLayerRequest, image: File | null, teamId: number) => async (dispatch: AppDispatch) => {
    if (image) {
      const imageResp = await imageAPI.saveImage(image).catch((error) => {
        alert('Error when uploading photo');
        console.log(error);
      });
      if (imageResp && imageResp.status === RespStatusEnum.SUCCESS) {
        const imageURL = imageResp.data;
        newPlayer.avatarUrl = imageURL;
        newPlayer.team = teamId;
        
        const resp = await playersAPI.addPlayer(newPlayer).catch((error) => {
          console.log(error);
          alert(error);
        });
        if (resp && resp.status === RespStatusEnum.SUCCESS) {
          alert('Player is successfully added ')
          return resp
        }
      }
    }
  };

export const getPositions = () => async (dispatch: AppDispatch) => {
  const resp = await playersAPI.getPositions().catch((error) => {
    console.log(error);
    alert(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    dispatch(setPositions(resp.data));
  }
};

export default playersSlice.reducer;

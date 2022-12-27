import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RespStatusEnum } from '../../types/enum';
import { IPlayersParamsGetRequest } from '../../types/IBaseParamsGetRequest';
import { IAddPLayerRequest } from '../../types/players/addPLayerRequest';
import { IPlayerData, IPlayersState } from '../../types/players/players';
import { AppDispatch } from '../store';
import { imageAPI, playersAPI, teamsAPI } from './../../api/api';

interface IPlayersSliceState {
  playersData: IPlayersState;
  positions: string[];
}

const initialState: IPlayersSliceState = {
  playersData: {
    data: [],
    count: 0,
    page: 1,
    size: 6,
  } as IPlayersState,
  positions: [],
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<IPlayersState>) {
      state.playersData = action.payload;
    },
    setPositions(state, { payload }: PayloadAction<string[]>) {
      state.positions = payload;
    },
  },
});

export const { setPlayers, setPositions } = playersSlice.actions;

export const fetchPlayers = (playersParams?: IPlayersParamsGetRequest) => async (dispatch: AppDispatch) => {
  const resp = await playersAPI.getPlayers(playersParams).catch((error) => {
    console.log(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    dispatch(setPlayers(resp.data));
    return resp;
  }
};

export const getPlayer = (id: number) => async () => {
  const resp = await playersAPI.getPlayer(id).catch((error) => {
    console.log(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    return resp;
  }
};

export const createPlayer =
  (newPlayer: IAddPLayerRequest, image: File | null) => async (dispatch: AppDispatch) => {
    if (image) {
      const imageResp = await imageAPI.saveImage(image).catch((error) => {
        alert('Error when uploading photo');
        console.log(error);
      });
      if (imageResp && imageResp.status === RespStatusEnum.SUCCESS) {
        const imageURL = imageResp.data;
        newPlayer.avatarUrl = imageURL;

        const resp = await playersAPI.addPlayer(newPlayer);
        return resp;
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

export const removePlayer = (id: number) => async (dispatch: AppDispatch) => {
  const resp = await playersAPI.deletePlayer({id}).catch((error) => {
    console.log(error);
    alert('Error when deleting the player');
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    // void dispatch(fetchPlayers());
  }
};

export default playersSlice.reducer;

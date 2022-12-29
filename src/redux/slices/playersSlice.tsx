import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RespStatusEnum } from '../../types/enum';
import { IPlayersParamsGetRequest } from '../../types/IBaseParamsGetRequest';
import { IAddPLayerRequest } from '../../types/players/addPLayerRequest';
import { IPlayerData, IPlayersState } from '../../types/players/players';
import { IUpdatePlayerRequest } from '../../types/players/updatePlayerRequest';
import { AppDispatch } from '../store';
import { imageAPI, playersAPI, teamsAPI } from './../../api/api';

interface IPlayersSliceState {
  playersData: IPlayersState;
}

const initialState: IPlayersSliceState = {
  playersData: {
    data: [],
    count: 0,
    page: 1,
    size: 6,
  } as IPlayersState,
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<IPlayersState>) {
      state.playersData = action.payload;
    },
  },
});

export const { setPlayers} = playersSlice.actions;

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

export const createPlayer = (newPlayer: IAddPLayerRequest) => async () => {
  // if (imageResp && imageResp.status === RespStatusEnum.SUCCESS) {
    // const imageURL = imageResp.data;
    // newPlayer.avatarUrl = imageURL;

    const resp = await playersAPI.addPlayer(newPlayer);
    return resp;
  // }
};


export const addPhoto = (image: File | null) => async () => {
  if (image) {
    const resp = await imageAPI.saveImage(image).catch((error) => {
      alert('Error when uploading photo');
      console.log(error);
    });
    if (resp && resp.status === RespStatusEnum.SUCCESS) {
      return resp.data;
    }
  }
};

export const getPositions = () => async (dispatch: AppDispatch) => {
  const resp = await playersAPI.getPositions().catch((error) => {
    console.log(error);
    alert(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    return resp.data
  }
};

export const editPlayer = (editedPlayer: IUpdatePlayerRequest) => async() => {
  const resp = await playersAPI.editPlayer(editedPlayer).catch(error => {
    console.log(error);
  })
  if(resp && resp.status === RespStatusEnum.SUCCESS) {
    return resp
  }
}

export const removePlayer = (id: number) => async () => {
  const resp = await playersAPI.deletePlayer({id}).catch((error) => {
    console.log(error);
  });
  if (resp && resp.status === RespStatusEnum.SUCCESS) {
    return resp
  }
};

export default playersSlice.reducer;

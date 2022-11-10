import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../api/api';
import { IResponseType, ISignInFormikValues, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';

export interface ICounterState {
  isAuth: boolean;
  error: { unauthorized: boolean };
  response: IResponseType;
}

const initialState: ICounterState = {
  isAuth: false,
  error: {
    unauthorized: false,
  },
  response: {
    name: '',
    avatarUrl: '',
    token: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<{ isAuth: boolean; signInData: IResponseType }>) {
      window.localStorage.setItem('isAuth', JSON.stringify(true));
      state.isAuth = action.payload.isAuth;
      state.response = action.payload.signInData;
    },
    signInFail(state, action: PayloadAction<boolean>) {
      state.error.unauthorized = action.payload;
    },
  },
});

export const login = (loginData: ISignInFormikValues) => async (dispatch: AppDispatch) => {
  const response = await authAPI.signIn(loginData)
    .catch((error) => {
      if (error.response.status === RespStatusEnum.Error) {
        dispatch(authSlice.actions.signInFail(true));
      }
  });

  if (response?.status === RespStatusEnum.Success) {
    dispatch(authSlice.actions.signInSuccess({ isAuth: true, signInData: response.data }));
  }
};

// export 

export const { signInSuccess, signInFail } = authSlice.actions;

export default authSlice.reducer;

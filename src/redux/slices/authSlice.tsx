import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../api/api';
import { ISignInFormikValues, ServerResponseEnum } from '../../types/types';
import { AppDispatch } from '../store';

export interface ICounterState {
  isAuth: boolean;
  error: {unauthorized: boolean}
}

const initialState: ICounterState = {
  isAuth: false,
  error: {
    unauthorized: false,
    // notFound: false
  }
};

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    signInSuccess(state, action) {
      window.localStorage.setItem('isAuth', JSON.stringify(true))
      state.isAuth = action.payload
    },
    signInFail(state, action) {
      // state.error.notFound = action.payload
      state.error.unauthorized = action.payload
    },
  },
});

export const { signInSuccess } = authSlice.actions;

export const login = (loginData: ISignInFormikValues) => async (dispatch: AppDispatch) => {
  const loginDataResp = await authAPI.signIn(loginData).catch((error) => {
    
    // if (error.response.status === 404) {
    //   dispatch(authSlice.actions.signInFail(true))
    // }
    if (error.response.status === ServerResponseEnum.Error) {
      dispatch(authSlice.actions.signInFail(true))
    };
  });

  if (loginDataResp && loginDataResp.status === ServerResponseEnum.Success) {
    dispatch(authSlice.actions.signInSuccess(true));
  }

};

export default authSlice.reducer;

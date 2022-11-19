import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { authAPI } from '../../api/api';
import { client } from '../../api/baseRequest';
import { IAuthResponseType, ISignInRequest, ISignUpRequest, RespStatusEnum } from '../../types/types';
import { AppDispatch } from '../store';

export interface ICounterState {
  isAuth: boolean;
  error: { unauthorized?: boolean, userExists?: boolean };
  signInResp: IAuthResponseType;
  signUpResp: IAuthResponseType;
  isSignedUp: boolean
}

const lsIsAuth = window.localStorage.getItem('isAuth')
const isAuth = (lsIsAuth !== null) ? JSON.parse(lsIsAuth) : false 
const initialState: ICounterState = {
  isAuth,
  error: {
    unauthorized: false,
    userExists: false
  },
  signInResp: {
    name: '',
    avatarUrl: '',
    token: '',
  },
  signUpResp: {
    name: '',
    avatarUrl: '',
    token: '',
  },
  isSignedUp: false 
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<{ isAuth: boolean; signInData: IAuthResponseType }>) {
      state.isAuth = action.payload.isAuth;
      state.signInResp = action.payload.signInData;
    },
    signUpSuccess(state, action: PayloadAction<{signedUp: boolean, SignUpData: IAuthResponseType}>) {
      state.signUpResp = action.payload.SignUpData
    },
    setError(state, action: PayloadAction<{unauthorized?: boolean, userExists?: boolean}>) {
      state.error.unauthorized = action.payload.unauthorized;
      state.error.userExists = action.payload.userExists
    },
  },
});


export const login = (loginData: ISignInRequest) => async (dispatch: AppDispatch) => {
  const response = await authAPI.signIn(loginData)
    .catch((error) => {
      if (error.response.status === RespStatusEnum.UNREGISTRED) {
        dispatch(authSlice.actions.setError({unauthorized: true}));
      }
  });
    if(response && response.status === RespStatusEnum.SUCCESS) {
      if (response?.status === RespStatusEnum.SUCCESS) {
        window.localStorage.setItem('isAuth', JSON.stringify(true));
        dispatch(signInSuccess({ isAuth: true, signInData: response.data}));
        window.localStorage.setItem('TOKEN', response.data.token)
      }
      
      // client.defaults.headers.common.Authorization = `Bearer ${String(response?.data.token)}`;
    } 
  
};


export const signUp = (signupData: ISignUpRequest) => async (dispatch: AppDispatch) => {
  const response = await authAPI.signUp(signupData)
  .catch((error) => {
    if (error.response.status === RespStatusEnum.EXISTS) {
      dispatch(authSlice.actions.setError({userExists: true}))
    }
  });
  if (response?.status === RespStatusEnum.SUCCESS) {
    alert('you sucessfully signed up')
    dispatch(authSlice.actions.signUpSuccess({signedUp: true, SignUpData: response.data}))
  }

}

export const { signInSuccess, setError } = authSlice.actions;

export default authSlice.reducer;

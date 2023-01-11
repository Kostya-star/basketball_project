import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from 'api/api';
import { ISignInRequest } from 'types/auth/SignInRequest';
import { IAuthResponseType } from 'types/auth/authResp';
import { ISignUpRequest } from 'types/auth/SignUpRequest';
import { RespStatusEnum } from 'types/enum';
import { AppDispatch } from 'redux/store';

export interface IAuthState {
  signInResp: IAuthResponseType;
  signUpResp: IAuthResponseType;
}

const initialState: IAuthState = {
  signInResp: {} as IAuthResponseType,
  signUpResp: {} as IAuthResponseType,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<{ signInData: IAuthResponseType }>) {
      state.signInResp = action.payload.signInData;
    },
    signUpSuccess(state, action: PayloadAction<IAuthResponseType>) {
      state.signUpResp = action.payload;
    },
  },
});

export const { signInSuccess, signUpSuccess } = authSlice.actions;

export const login = (loginData: ISignInRequest) => async (dispatch: AppDispatch) => {
  const response = await authAPI.signIn(loginData);

  if (response && response.status === RespStatusEnum.SUCCESS) {
    if (response?.status === RespStatusEnum.SUCCESS) {
      window.localStorage.setItem('isAuth', JSON.stringify(true));
      dispatch(signInSuccess({ signInData: response.data }));
      window.localStorage.setItem('TOKEN', response.data.token);
      window.localStorage.setItem('userName', response.data.name);
    }
  }
  return response;
};

export const signUp = (signupData: ISignUpRequest) => async (dispatch: AppDispatch) => {
  const response = await authAPI.signUp(signupData);
  if (response?.status === RespStatusEnum.SUCCESS) {
    dispatch(signUpSuccess(response.data));
  }
  return response;
};

export default authSlice.reducer;

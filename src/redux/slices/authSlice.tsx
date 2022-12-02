import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../api/api';
import { ISignInRequest } from '../../types/auth/SignInRequest';
import { IAuthResponseType } from '../../types/auth/authResp';
import { ISignUpRequest } from '../../types/auth/SignUpRequest';
import { RespStatusEnum } from '../../types/enum';
import { AppDispatch } from '../store';

export interface IAuthState {
  error: { unauthorized?: boolean; userExists?: boolean };
  signInResp: IAuthResponseType;
  signUpResp: IAuthResponseType;
}

const initialState: IAuthState = {
  error: {
    unauthorized: false,
    userExists: false,
  },
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
    setError(state, action: PayloadAction<{ unauthorized?: boolean; userExists?: boolean }>) {
      state.error.unauthorized = action.payload.unauthorized;
      state.error.userExists = action.payload.userExists;
    },
  },
});

export const login = (loginData: ISignInRequest) => async (dispatch: AppDispatch) => {
  const response = await authAPI.signIn(loginData).catch((error) => {
    if (error.response.status === RespStatusEnum.UNREGISTRED) {
      dispatch(authSlice.actions.setError({ unauthorized: true }));
    }
  });

  if (response && response.status === RespStatusEnum.SUCCESS) {
    if (response?.status === RespStatusEnum.SUCCESS) {
      window.localStorage.setItem('isAuth', JSON.stringify(true));
      dispatch(signInSuccess({ signInData: response.data }));
      window.localStorage.setItem('TOKEN', response.data.token);
    }
  }

  return response;
};

export const signUp = (signupData: ISignUpRequest) => async (dispatch: AppDispatch) => {
  const response = await authAPI.signUp(signupData).catch((error) => {
    if (error.response.status === RespStatusEnum.EXISTS) {
      dispatch(authSlice.actions.setError({ userExists: true }));
    }
  });
  if (response?.status === RespStatusEnum.SUCCESS) {
    alert('you sucessfully signed up');
    dispatch(authSlice.actions.signUpSuccess(response.data));
  }
};

export const { signInSuccess, setError } = authSlice.actions;

export default authSlice.reducer;

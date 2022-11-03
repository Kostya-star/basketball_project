import axios from 'axios';
import {client} from './baseRequest'
import { ISignInFormikValues, ISignUpFormikValues } from './../types/types';


interface ISignInRequest extends ISignInFormikValues{}

interface ISignUpRequest extends ISignUpFormikValues{}

export const authAPI = {
  async signIn(signInUserData: ISignInRequest) {
    return await client.post(`Auth/SignIn`, signInUserData);
  },

  async signUp(signUpUserData: ISignUpRequest) {
    return await client.post(`Auth/SignUp`, signUpUserData);
  },
};

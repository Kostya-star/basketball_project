import axios from 'axios';
import {client} from './baseRequest'
import { ISignInFormikValues, ISignUpFormikValues } from './../types/types';


export const authAPI = {
  async signIn(signInUserData: ISignInFormikValues) {
    return await client.post(`Auth/SignIn`, signInUserData).then((response) => response.data);
  },

  async signUp(signUpUserData: ISignUpFormikValues) {
    return await client.post(`Auth/SignUp`, signUpUserData).then((response) => response.data);
  },
};

import { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../FormComponents/InputSubmit';
import * as Yup from 'yup';
import signInImg from '../../assets/img/imgSignIn/signin-img.png';
import { InputPassword } from './../FormComponents/InputPassword';
import { InputText } from './../FormComponents/InputText';
import { authAPI } from '../../api/api';
import '../../scss/auth-common.scss';
import { ISignInFormikValues } from './../../types/types';
import { FormBg } from '../FormBg';
import { FormLink } from './../FormLink';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import { login, authSlice } from '../../redux/slices/authSlice';
import { RespError } from './../RespError';

interface ISignInProps {
  // children: JSX.Element|JSX.Element[];
  children?: React.ReactNode;
}

export const SignIn: FC<ISignInProps> = () => {
  SignIn.displayName = 'SignIn';

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth, unauthorized } = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
    unauthorized: state.auth.error.unauthorized,
  }));
  const dispatch = useAppDispatch();

  // gives an important error. Fix later!
  if (isAuth) navigate('/');

  useEffect(() => {
    if (unauthorized) {
      const authTimer = setTimeout(() => {
        dispatch(authSlice.actions.setError({ unauthorized: false }));
      }, 2500);
      return () => clearTimeout(authTimer);
    }
  }, [unauthorized]);

  const initialValues = {
    login: '',
    password: '',
  } as ISignInFormikValues;

  const validationSchema = Yup.object({
    login: Yup.string()
      .required('Required')
      .matches(/^[a-zA-Z0-9]+$/, 'Login can only contain Latin letters and numbers'),
    password: Yup.string()
      .required('Required')
      .min(6, 'The password must be at least 6 chars')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        'Password must contain at least one number and one special char'
      ),
  });

  const onSubmit = async (loginData: ISignInFormikValues) => {
    await dispatch(login(loginData));
  };

  return (
    <div className="auth__wrapper">
      <div className="form__wrapper">
        <div className="form">
          <h1 className="form__heading">Sign In</h1>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <InputText label="Login" name="login" />
                  <InputPassword label="Password" name="password" />
                  <InputSubmit isDisabled={!formik.isValid} value="Sign In" name="button" />
                </Form>
              );
            }}
          </Formik>
          <FormLink mainText="Not a member yet?" path="/SignUp" linkText="Sign up" />
        </div>
      </div>

          <RespError text="User with the specified username / password was not found." />

      <FormBg src={signInImg} />
    </div>
  );
};

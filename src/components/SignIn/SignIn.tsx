import { ChangeEvent } from 'react';
import signInImg from '../../assets/img/imgSignIn/signin-img.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../FormComponents/InputSubmit';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { InputPassword } from './../FormComponents/InputPassword';
import { InputText } from './../FormComponents/InputText';
import './../../scss/auth-common.scss';
import { authAPI } from '../../api/api';
import { ISignInFormikValues } from './../../types/types';

// interface ISignInAxiosPost extends ISignInFormikValues {
//   name?: string
// }

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    login: '',
    password: '',
  } as ISignInFormikValues;

  const validationSchema = Yup.object({
    login: Yup.string()
      .required('This field is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Login can only contain Latin letters and numbers'),
    password: Yup.string()
      .required('This field is required')
      .min(6, 'The password must be at least 6 chars')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        'Password must contain at least one number and one special char'
      ),
  });

  const onSubmit = async (values: ISignInFormikValues) => {
    const { ...signInUserData } = values;
    const response = await authAPI.signIn(signInUserData).catch((error) => {
      if (error && error.response.status === 404) alert('Not found, 404 error!');
      if (error && error.response.status === 401) {
        alert('You need to sign up first!');
        return navigate('/SignUp');
      }
    });
    if (response) alert(`${response.data.name} successfully signed in!`);
  };

  return (
    <div className="auth__wrapper">
      <div className="form__wrapper">
        <div className="form">
          <h1 className="form__heading">Sign In</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <InputText label="Login" name="login" type="text" />
                  <InputPassword label="Password" name="password" type="password" />
                  <InputSubmit isDisabled={!formik.isValid} value="Sign In" name="button" />
                </Form>
              );
            }}
          </Formik>

          <div className="form__link">
            Not a member yet?
            <Link to="/SignUp"> Sign up</Link>
          </div>
        </div>
      </div>

      <div className="auth__mainImg">
        <p className="auth__mainImg_bg">
          <img src={signInImg} alt="boys playing basketball" />
        </p>
      </div>
    </div>
  );
};

import { Link, useNavigate, useLocation } from 'react-router-dom';
import SignUpImg from '../../assets/img/imgSignUp/signup-Img.png';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputText } from '../FormComponents/InputText';
import { InputPassword } from '../FormComponents/InputPassword';
import { InputCheckbox } from '../FormComponents/InputCheckbox';
import { InputSubmit } from '../FormComponents/InputSubmit';
import { authAPI } from '../../api/api';
import { FC, useEffect, useState } from 'react';
import '../../scss/auth-common.scss';
import { ISignUpFormikValues } from '../../types/types';
import { FormBg } from '../FormBg';
import { FormLink } from '../FormLink';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signUp, authSlice, setError } from '../../redux/slices/authSlice';
import { RespError } from '../RespError';


export const SignUp: FC = () => {
  const navigate = useNavigate();

  const { userExists } = useAppSelector(({ auth }) => ({
    userExists: auth.error.userExists,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userExists) {
      const authTimer = setTimeout(() => {
        dispatch(setError({ userExists: false }));
      }, 2500);
      return () => clearTimeout(authTimer);
    }
  }, [userExists]);

  const initialValues = {
    userName: '',
    login: '',
    password: '',
    confirmPassword: '',
    check: false,
  } as ISignUpFormikValues;

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required('Required')
      .max(15, 'Must be 15 characters or less')
      .matches(/[a-zA-Z]/, 'Name can only contain Latin letters'),
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
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    check: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const onSubmit = async (values: ISignUpFormikValues) => {
    const { userName, login, password } = values;
    const signUpUserData = { userName, login, password };

    await dispatch(signUp(signUpUserData));
  };

  return (
    <div className="auth__wrapper">
      <div className="form__wrapper">
        <div className="form">
          <h1 className="form__heading">Sign Up</h1>

          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <InputText<'userName'> label="Name" name="userName" />
                  <InputText<'login'> label="Login" name="login" />
                  <InputPassword<'password'> label="Password" name="password" />
                  <InputPassword<'confirmPassword'>
                    label="Enter your password again"
                    name="confirmPassword"
                  />

                  <InputCheckbox<'check'> name="check" id="check" label="I accept the agreement" />

                  <InputSubmit isDisabled={!formik.isValid} value="Sign Up" />
                </Form>
              );
            }}
          </Formik>
          <FormLink mainText="Already a member?" path="/SignIn" linkText="Sign in" />
        </div>
      </div>

      <RespError text="User with the specified login already exists." />

      <FormBg src={SignUpImg} />
    </div>
  );
};

import React from 'react';
import s from './SignUp.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import SignUpImg from '../../assets/img/imgSignUp/signup-Img.png';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputText } from '../FormComponents/InputText';
import { InputCheckbox } from '../FormComponents/InputCheckbox';
import { InputSubmit } from '../FormComponents/InputSubmit';
import axios from 'axios';
import { InputPassword } from './../FormComponents/InputPassword';

interface SignUpFormikValuesType {
  userName: string;
  login: string;
  password: string;
  confirmPassword: string;
  check: boolean;
}
export const SignUp = () => {
  const navigate = useNavigate();
  const baseUrl = 'http://dev.trainee.dex-it.ru/api/Auth';

  const initialValues = {
    userName: '',
    login: '',
    password: '',
    confirmPassword: '',
    check: false,
  } as SignUpFormikValuesType;
  const validationSchema = Yup.object({
    userName: Yup.string()
      .required('Required')
      .max(15, 'Must be 15 characters or less')
      .matches(/[a-zA-Z]/, 'Name can only contain Latin letters'),
    login: Yup.string()
      .required('Required')
      .matches(/^[a-zA-Z0-9]+$/, 'Login can only contain Latin letters'),
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
  const onSubmit = (values: SignUpFormikValuesType) => {
    const { ...data } = values;
    axios
      .post(`${baseUrl}/SignUp`, data)
      .then((response) => {
        if (response.status === 200 || response.statusText === 'OK') {
          alert(`Thank you for your registration, ${response.data.name}!`);
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.response.status === 409 || error.response.statusText === 'Conflict') {
          alert(`Login: '${JSON.parse(error.config.data).login}' already exists`);
        }
      });
  };

  return (
    <>
      <div className={s.signUp__wrapper}>
        <div className={s.form__wrapper}>
          <div className={s.form}>
            <h1 className={s.form__heading}>Sign Up</h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnMount
            >
              {(formik) => {
                return (
                  <Form>
                    <InputText label="Name" name="userName" type="text" />
                    <InputText label="Login" name="login" type="text" />
                    <InputPassword label="Password" name="password" type="password" />
                    <InputPassword
                      label="Enter your password again"
                      name="confirmPassword"
                      type="password"
                    />

                    <InputCheckbox
                      name="check"
                      id="check"
                      type="checkbox"
                      label="I accept the agreement"
                    />

                    <InputSubmit isDisabled={!formik.isValid} value="Sign Up" name="button" />
                  </Form>
                );
              }}
            </Formik>

            <div className={s.form__link}>
              Already a member?
              <Link to="/"> Sign In</Link>
            </div>
          </div>
        </div>

        <div className={s.signUp__mainImg}>
          <p className={s.signUp__mainImg_bg}>
            <img src={SignUpImg} alt="boys playing basketball" />
          </p>
        </div>
      </div>
    </>
  );
};

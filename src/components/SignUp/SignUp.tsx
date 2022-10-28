import React from 'react';
import s from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import SignUpImg from '../../assets/img/imgSignUp/signup-Img.png';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../FormComponents/TextInput';
import { CheckboxInput } from '../FormComponents/CheckboxInput';
import { SubmitButton } from './../FormComponents/SubmitButton';

interface SignUpFormikValuesType {
  name: string;
  login: string;
  password: string;
  confirmPassword: string;
  checkbox: boolean;
}
export const SignUp = () => {
  return (
    <div className={s.signUp__wrapper}>
      <div className={s.form}>
        <h1 className={s.form__heading}>Sign Up</h1>

        <Formik
          initialValues={
            {
              name: '',
              login: '',
              password: '',
              confirmPassword: '',
              checkbox: false,
            } as SignUpFormikValuesType
          }
          validationSchema={Yup.object({
            name: Yup.string()
              .required('This field is required')
              .max(15, 'Must be 15 characters or less')
              .matches(/[a-zA-Z]/, 'Name can only contain Latin letters'),
            login: Yup.string()
              .required('This field is required')
              .matches(/^[a-zA-Z0-9]+$/, 'Login can only contain Latin letters'),
            password: Yup.string()
              .required('This field is required')
              .min(6, 'The password must be at least 6 chars')
              .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Password must contain at least one number and one special char'
              ),
            confirmPassword: Yup.string()
              .required('This field is required')
              .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            checkbox: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <TextInput label="Name" name="name" type="text" />
            <TextInput label="Login" name="login" type="text" />
            <TextInput label="Password" name="password" type="text" />
            <TextInput label="Confirm password" name="confirmPassword" type="text" />

            <CheckboxInput name="checkbox" type="checkbox">
              I accept the agreement
            </CheckboxInput>

            <SubmitButton />
          </Form>
        </Formik>

        <div className={s.form__link}>
          Already a member?
          <Link to="/"> Sign In</Link>
        </div>
      </div>

      <div>
        <p>
          <img src={SignUpImg} alt="" />
        </p>
      </div>
    </div>
  );
};

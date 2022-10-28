import React, { ChangeEvent } from 'react';
import s from './SignIn.module.scss';
import signInImg from '../../assets/img/imgSignIn/signin-img.png';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { SubmitButton } from '../FormComponents/SubmitButton';
import * as Yup from 'yup';
import { TextInput } from '../FormComponents/TextInput';

interface SignInFormikValuesType {
  login: string;
  password: string;
}

export const SignIn: React.FC = () => {
  return (
    <div className={s.signIn__wrapper}>
      <div className={s.signIn__form}>
        <h1 className={s.signIn__form__heading}>Sign In</h1>
        <Formik
          initialValues={
            {
              login: '',
              password: '',
            } as SignInFormikValuesType
          }
          validationSchema={Yup.object({
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
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <TextInput label="Login" name="login" type="text" />
            <TextInput label="Password" name="password" type="text" />
            <SubmitButton />
          </Form>
        </Formik>
        <p className={s.signIn__form__link}>
          Not a member yet?
          <Link to="/SignUp"> Sign up</Link>
        </p>
      </div>

      <div className={s.signIn__img__block}>
        <p>
          <img src={signInImg} alt={s.signIn__basketballimg} />
        </p>
      </div>
    </div>
  );
};


import { FC, useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../FormComponents/InputSubmit';
import * as Yup from 'yup';
import signInImg from '../../assets/img/imgSignIn/signin-img.png';
import { InputPassword } from './../FormComponents/InputPassword';
import { InputText } from './../FormComponents/InputText';
import { authAPI } from '../../api/api';
import '../../scss/auth-common.scss';
import { ISignInFormikValues } from './../../types/types';
import { FormBgImg } from '../FormBgImg';
import { FormLink } from './../FormLink';
import { Context } from '../AppRouter/AppRouter';

export const SignIn: FC = () => {
  const navigate = useNavigate();
  // @ts-expect-error
  const {isAuth, setIsAuth} = useContext(Context)
  console.log(isAuth);
  console.log(setIsAuth);
  

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

  const onSubmit = async (values: ISignInFormikValues) => {
    const { ...signInUserData } = values;
    const response = await authAPI.signIn(signInUserData).catch((error) => {
      if (error && error.response.status === 404) alert('Not found, 404 error!');
      if (error && error.response.status === 401) {
        alert('You need to sign up first!');
        return navigate('/SignUp');
      }
    });
    if (response) {
      // alert(`${response.data.name} successfully signed in!`);
      return navigate('/');
    }
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

      <FormBgImg src={signInImg} />
    </div>
  );
};

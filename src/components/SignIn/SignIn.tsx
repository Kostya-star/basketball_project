import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import { login } from '../../redux/slices/authSlice';

export const SignIn: FC = () => {
  SignIn.displayName = 'SignIn';

  const navigate = useNavigate();

  const {isAuth, unauthorized} = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
    unauthorized: state.auth.error.unauthorized,
    // notFound: state.auth.error.notFound
  }));
  const dispatch = useAppDispatch();

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

  if (isAuth) navigate('/')

  if(unauthorized) navigate('/SignUp')
  // if(notFound) navigate('/notFound')

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

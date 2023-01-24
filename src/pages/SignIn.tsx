import signInImg from 'assets/img/imgSignIn/signin-img.png';
import { FormBg } from 'components/FormBg/FormBg';
import { FormLink } from 'components/FormLink';
import { InputPassword } from 'components/InputPassword/InputPassword';
import { InputSubmit } from 'components/InputSubmit/InputSubmit';
import { InputText } from 'components/InputText/InputText';
import { RespError } from 'components/RespError';
import { ErrorMessage, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { login } from 'redux/slices/authSlice';
import 'scss/form.scss';
import { ISignInFormikValues } from 'types/auth/auth';
import * as Yup from 'yup';

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
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&]+)$/,
      'Password must contain at least letters and numbers'
    ),
});

export const SignIn = () => {
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = async (loginData: ISignInFormikValues) => {
    setDisabledSubmit(true);
    const resp = await dispatch(login(loginData)).catch((error) => {
      if (error) {
        setServerResponse(error.response.statusText);
      }
    });
    if (resp?.data) {
      navigate(`/Teams`);
    }
    setDisabledSubmit(false);
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
                  <div className="form__group">
                    <InputText<'login'> label="Login" name="login" />
                    <ErrorMessage className="form__error" name="login" component="span" />
                  </div>

                  <div className="form__group">
                    <InputPassword<'password'> label="Password" name="password" />
                    <ErrorMessage className="form__error" name="password" component="span" />
                  </div>

                  <InputSubmit isDisabled={disabledSubmit} value="Sign In" />
                </Form>
              );
            }}
          </Formik>
          <FormLink mainText="Not a member yet?" path="/SignUp" linkText="Sign up" />
        </div>
      </div>

      {serverResponse && <RespError response={serverResponse} setResponse={setServerResponse} />}

      <FormBg src={signInImg} />
    </div>
  );
};

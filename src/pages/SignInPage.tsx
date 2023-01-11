import signInImg from 'assets/img/imgSignIn/signin-img.png';
import { FormBg } from 'components/FormBg/FormBg';
import { InputPassword } from 'components/FormComponents/InputPassword';
import { InputSubmit } from 'components/FormComponents/InputSubmit';
import { InputText } from 'components/FormComponents/InputText';
import { FormLink } from 'components/FormLink';
import { RespError } from 'components/RespError';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { login } from 'redux/slices/authSlice';
import 'scss/auth-common.scss';
import { ISignInFormikValues } from 'types/auth/auth';
import * as Yup from 'yup';

interface ISignInProps {
  children?: React.ReactNode;
}

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

export const SignInPage: FC<ISignInProps> = () => {
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
                  <InputText<'login'> label="Login" name="login" />
                  <InputPassword<'password'> label="Password" name="password" />
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

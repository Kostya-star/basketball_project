import SignUpImg from 'assets/img/imgSignUp/signup-Img.png';
import { FormBg } from 'components/FormBg/FormBg';
import { FormLink } from 'components/FormLink';
import { InputCheckbox } from 'components/InputCheckbox/InputCheckbox';
import { InputPassword } from 'components/InputPassword/InputPassword';
import { InputSubmit } from 'components/InputSubmit/InputSubmit';
import { InputText } from 'components/InputText/InputText';
import { RespError } from 'components/RespError';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { signUp } from 'redux/slices/authSlice';
import 'scss/auth.scss';
import { ISignUpFormikValues } from 'types/auth/auth';
import { RespStatusEnum } from 'types/enum';
import * as Yup from 'yup';

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
    .matches(/[a-zA-Z]+$/, 'Name can only contain Latin letters'),
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
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  check: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
});

export const SignUp = () => {
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const dispatch = useAppDispatch();

  const onSubmit = async (values: ISignUpFormikValues) => {
    setDisabledSubmit(true);
    const { userName, login, password } = values;
    const signUpUserData = { userName, login, password };

    const resp = await dispatch(signUp(signUpUserData)).catch((error) => {
      if (error && error.response.status === RespStatusEnum.EXISTS) {
        setServerResponse('User with the specified login already exists');
      }
    });
    if (resp && resp.status === RespStatusEnum.SUCCESS) {
      setServerResponse('User was created successfully');
    }

    setDisabledSubmit(false);
  };

  return (
    <div className="auth__wrapper">
      <div className="form__wrapper">
        <div className="form">
          <h1 className="form__heading">Sign Up</h1>

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
                    <InputText<'userName'> label="Name" name="userName" />
                    <ErrorMessage className="form__error" name="userName" component="span" />
                  </div>

                  <div className="form__group">
                    <InputText<'login'> label="Login" name="login" />
                    <ErrorMessage className="form__error" name="login" component="span" />
                  </div>

                  <div className="form__group">
                    <InputPassword<'password'> label="Password" name="password" />
                    <ErrorMessage className="form__error" name="password" component="span" />
                  </div>

                  <div className="form__group">
                    <InputPassword<'confirmPassword'>
                      label="Enter your password again"
                      name="confirmPassword"
                    />
                    <ErrorMessage className="form__error" name="confirmPassword" component="span" />
                  </div>

                  <div style={{ height: '40px' }}>
                    <InputCheckbox<'check'>
                      name="check"
                      id="check"
                      label="I accept the agreement"
                    />
                    <ErrorMessage className="form__error" name="check" component="span" />
                  </div>

                  <InputSubmit isDisabled={disabledSubmit} value="Sign Up" />
                </Form>
              );
            }}
          </Formik>
          <FormLink mainText="Already a member?" path="/SignIn" linkText="Sign in" />
        </div>
      </div>

      {serverResponse && <RespError response={serverResponse} setResponse={setServerResponse} />}

      <FormBg src={SignUpImg} />
    </div>
  );
};

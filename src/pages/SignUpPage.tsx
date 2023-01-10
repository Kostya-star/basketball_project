import SignUpImg from 'assets/img/imgSignUp/signup-Img.png';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'components/FormComponents/InputText';
import { InputPassword } from 'components/FormComponents/InputPassword';
import { InputCheckbox } from 'components/FormComponents/InputCheckbox';
import { InputSubmit } from 'components/FormComponents/InputSubmit';
import { FC, useEffect, useState } from 'react';
import 'scss/auth-common.scss';
import { FormBg } from 'components/FormBg/FormBg';
import { FormLink } from 'components/FormLink';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { signUp } from 'redux/slices/authSlice';
import { RespError } from 'components/RespError';
import { ISignUpFormikValues } from 'types/auth/auth';
import { RespStatusEnum } from 'types/enum';
import { useNavigate } from 'react-router-dom';

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

export const SignUpPage: FC = () => {
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const navigate = useNavigate();
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
                  <InputText<'userName'> label="Name" name="userName" />
                  <InputText<'login'> label="Login" name="login" />
                  <InputPassword<'password'> label="Password" name="password" />
                  <InputPassword<'confirmPassword'>
                    label="Enter your password again"
                    name="confirmPassword"
                  />

                  <InputCheckbox<'check'> name="check" id="check" label="I accept the agreement" />

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

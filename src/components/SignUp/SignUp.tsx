import { Link, useNavigate } from 'react-router-dom';
import SignUpImg from '../../assets/img/imgSignUp/signup-Img.png';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputText } from '../FormComponents/InputText';
import { InputPassword } from './../FormComponents/InputPassword';
import { InputCheckbox } from '../FormComponents/InputCheckbox';
import { InputSubmit } from '../FormComponents/InputSubmit';
import { authAPI } from './../../api/api';
import '../../scss/auth-common.scss';
import { ISignUpFormikValues } from '../../types/types';
import { FormBgImg } from '../FormBgImg';
import { FormLink } from '../FormLink';

export const SignUp = () => {
  const navigate = useNavigate();

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
    const { ...signUpUserData } = values;
    const response = await authAPI.signUp(signUpUserData).catch((error) => {
      if (error && error.response.status === 409) {
        alert(`Login: '${JSON.parse(error.config.data).login}' already exists`);
      }
      if (error && error.response.status === 404) alert('Not found, 404 error!');
    });
    if (response) {
      alert(`Thank you for your registration, ${response.data.name}!`);
      navigate('/');
    }
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
                  <InputText label="Name" name="userName" />
                  <InputText label="Login" name="login" />
                  <InputPassword label="Password" name="password" />
                  <InputPassword label="Enter your password again" name="confirmPassword" />

                  <InputCheckbox name="check" id="check" label="I accept the agreement" />

                  <InputSubmit isDisabled={!formik.isValid} value="Sign Up" name="button" />
                </Form>
              );
            }}
          </Formik>
          <FormLink mainText="Already a member?" path="/" linkText="Sign in" />
        </div>
      </div>

      <FormBgImg src={SignUpImg} />
    </div>
  );
};

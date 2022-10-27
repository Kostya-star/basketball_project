import React, { ChangeEvent, FocusEvent } from 'react';
import s from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import SignUpImg from '../../assets/img/imgSignUp/signup-Img.png';
import classnames from 'classnames';
import { useFormik, Field, ErrorMessage, FormikProvider, Formik, Form } from 'formik';
import * as Yup from 'yup';

export const SignUp = () => {
  // useState for the first 'name input
  // const [name, setName] = React.useState('');
  // const [isNameDirty, setIsNameDirty] = React.useState(false);
  // const [nameError, setNameError] = React.useState("Mustn't be empty");

  // useState for the second 'login' input
  // const [login, setLogin] = React.useState('');
  // const [isLoginDirty, setIsLoginDirty] = React.useState(false);
  // const [loginError, setLoginError] = React.useState("Mustn't be empty");

  // useState for the third 'password' input
  // const [password, setPassword] = React.useState('');
  // const [isPasswordDirty, setIsPasswordDirty] = React.useState(false);
  // const [passwordError, setPasswordError] = React.useState('plz write your password');

  // useState for the submit input
  // const [isActiveSubmit, setIsActiveSubmit] = React.useState(false);

  // useState for the checkbox input
  // const [isChecked, setIsChecked] = React.useState(false);
  // const [checkedError, setCheckedError] = React.useState('');
  // console.log(isChecked);
  // console.log(checkedError);

  // React.useEffect(() => {
  //   if (nameError || loginError || passwordError || !isChecked) setIsActiveSubmit(false);
  //   else setIsActiveSubmit(true);
  // }, [nameError, loginError, passwordError, isChecked]);

  // const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
  // switch (e.target.id) {
  //   case 'name':
  //     {
  //       setName(e.target.value);
  //       const nameRegex = /^[a-zA-Z]+$/;
  //       if (!nameRegex.test(String(e.target.value).toLowerCase())) {
  //         setNameError('name is wrong');
  //         if (!e.target.value) {
  //           setNameError("Mustn't be empty");
  //         }
  //       } else {
  //         setNameError('');
  //       }
  //     }
  //     break;

  //   case 'login':
  //     {
  //       setLogin(e.target.value);
  //       const loginRegex = /^[a-zA-Z0-9]+$/;
  //       if (!loginRegex.test(String(e.target.value).toLowerCase())) {
  //         setLoginError('wrong Login!');
  //         if (!e.target.value) setLoginError("Mustn't be empty");
  //       } else setLoginError('');
  //     }
  //     break;

  //   case 'password':
  //     setPassword(e.target.value);
  //     if (e.target.value.length < 3 || e.target.value.length > 8) {
  //       setPasswordError('password must be more than 3 and fewer than 8 characters');
  //       if (!e.target.value) setPasswordError('plz write smth here!');
  //     } else setPasswordError('');
  //     break;

  //   case 'checkbox':
  //     setIsChecked(!isChecked);
  //     if (isChecked) {
  //       setCheckedError('Must be ticked');
  //     } else setCheckedError('');
  //     break;
  // }
  // };

  // const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
  // switch (e.target.id) {
  //   case 'name':
  //     setIsNameDirty(true);
  //     break;

  //   case 'login':
  //     setIsLoginDirty(true);
  //     break;

  //   case 'password':
  //     setIsPasswordDirty(true);
  //     break;
  // }
  // };

  // FORMIK

  interface FormikInitialValuesType {
    name: string;
    login: string;
    password: string;
    confirmPassword: string;
    checkbox: boolean;
  }

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
            } as FormikInitialValuesType
          }
          validationSchema={Yup.object({
            name: Yup.string()
              .required('This field is required')
              .max(15, 'Must be 15 characters or less'),
            login: Yup.string().required('This field is required'),
            password: Yup.string()
              .required('This field is required')
              .min(6, 'The password must be over 6 chars'),
            confirmPassword: Yup.string()
              .required('This field is required')
              .min(6, 'The password must be over 6 chars'),
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
            <label className={s.form__label} htmlFor="name">
              Name
            </label>
            <Field name="name" type="text" className={s.form__input} />
            <ErrorMessage name='name' />

            <label className={s.form__label} htmlFor="login">
              Login
            </label>
            <Field name="login" type="text" className={s.form__input} />
            <ErrorMessage name="login" />

            <label className={s.form__label} htmlFor="password">
              Password
            </label>
            <Field name="password" type="text" className={s.form__input} />
            <ErrorMessage name="password" />

            <label className={s.form__label} htmlFor="password">
              Confirm your password
            </label>
            <Field name="confirmPassword" type="text" className={s.form__input} />
            <ErrorMessage name="confirmPassword" />

            <Field name="checkbox" type="checkbox" />
            <label className={s.form__label} htmlFor="checkbox">
              I accept the agreement
            </label>
            <ErrorMessage name="checkbox" component="div" />

            <button className={`${s.form__input} ${s.form__input__submit}`} type="submit">
              Sign Up
            </button>
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

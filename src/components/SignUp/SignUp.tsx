import React, { ChangeEvent, FocusEvent } from 'react';
import s from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import SignUpImg from '../../assets/img/imgSignUp/signup-Img.png';
import classnames from 'classnames';
import {useFormik} from 'formik'


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

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
      confirmPassword: '',
      checkbox: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  });

  return (
    <div className={s.signUp__wrapper}>
      <div className={s.form}>
        <form onSubmit={formik.handleSubmit} action="">
          <h1 className={s.form__heading}>Sign Up</h1>

          <label className={s.form__label} htmlFor="name">Name</label>
            <input
              id="name"
              name='name'
              type="text"
              className={s.form__input}
              onChange={formik.handleChange}
              value={formik.values.name}
            />

          <label className={s.form__label} htmlFor="login">Login</label>
            <input
              id="login"
              name='login'
              type="text"
              className={s.form__input}
              onChange={formik.handleChange}
              value={formik.values.login}
            />

          <label className={s.form__label} htmlFor="password">Password</label>
            <input
              id="password"
              name='password'
              type="text"
              className={s.form__input}
              onChange={formik.handleChange}
              value={formik.values.password}
            />

          <label className={s.form__label} htmlFor="password">Confirm your password</label>
            <input
              id="confirmPassword"
              name='confirmPassword'
              type="text"
              className={s.form__input}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />

            <input
              id="checkbox"
              name='checkbox'
              type="checkbox"
              onChange={formik.handleChange}
              value={formik.values.checkbox}
            />
          <label className={s.form__label} htmlFor="checkbox"> I accept the agreement</label>
        </form>

        <div>
          <input
            className={`${s.form__input} ${s.form__input__submit}`}
            type="submit"
            value="Sign Up"
          />
        </div>

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

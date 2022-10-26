import React, { ChangeEvent, FocusEvent } from 'react';
import s from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import SignUpImg from '../../assets/img/imgSignUp/signup-Img.png';
import classnames from 'classnames'


export const SignUp = () => {
  // useState for the first 'name input
  const [name, setName] = React.useState('');
  const [isNameDirty, setIsNameDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState("Mustn't be empty");
  

  // useState for the second 'login' input
  const [login, setLogin] = React.useState('')
  const [isLoginDirty, setIsLoginDirty] = React.useState(false)
  const [loginError, setLoginError] = React.useState('Mustn\'t be empty')

  // useState for the third 'password' input
  const [password, setPassword] = React.useState('')
  const [isPasswordDirty, setIsPasswordDirty] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState('plz write your password')

  // useState for the submit input
  const [isActiveSubmit, setIsActiveSubmit] = React.useState(false)

  // useState for the checkbox input
  const [isChecked, setIsChecked] = React.useState(false)
  const [checkedError, setCheckedError] = React.useState('')
  console.log(isChecked);
  console.log(checkedError);

  

  React.useEffect(() => {
    if(nameError || loginError || passwordError || !isChecked) setIsActiveSubmit(false)
    else setIsActiveSubmit(true)
  }, [nameError, loginError, passwordError, isChecked])


  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'name': {
        setName(e.target.value);
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(String(e.target.value).toLowerCase())) {
          setNameError('name is wrong');
          if (!e.target.value) {
            setNameError("Mustn't be empty");
          }
        } else {
          setNameError('');
        }
      }
      break;

      case 'login': {
        setLogin(e.target.value)
        const loginRegex = /^[a-zA-Z0-9]+$/;
        if (!loginRegex.test(String(e.target.value).toLowerCase())) {
          setLoginError('wrong Login!')
          if (!e.target.value) setLoginError('Mustn\'t be empty')
        } else setLoginError('')
      }
      break;

      case 'password': 
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 8) {
          setPasswordError('password must be more than 3 and fewer than 8 characters');
          if (!e.target.value) setPasswordError('plz write smth here!')
        } else setPasswordError('')
      break;
      
      case 'tick':
        setIsChecked(!isChecked)
        if (isChecked) {
          setCheckedError('Must be ticked')
        } 
        else setCheckedError('')
      break;
    }
  };

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    switch(e.target.id) {
      case 'name': 
        setIsNameDirty(true);
      break;

      case 'login': 
        setIsLoginDirty(true);
      break;

      case 'password': 
        setIsPasswordDirty(true)
      break;

    }
  };


  return (
    <div className={s.signUp__wrapper}>
      <div className={s.form}>
        <form action="">
          <h1 className={s.form__heading}>Sign Up</h1>

          <label className={s.form__label} htmlFor="name">
            <span>Name</span>
            <input
              id="name"
              className={s.form__input}
              type="text"
              value={name}
              onChange={(e) => onInputHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            {isNameDirty && nameError && <div className={s.dirtyInpError}>{nameError}</div>}
          </label>

          <label className={s.form__label} htmlFor="login">
            <span>Login</span>
            <input
              id="login"
              className={s.form__input}
              type="text"
              onChange={(e) => onInputHandler(e)}
              value={login}
              onBlur={(e) => onBlurHandler(e)}
            />
            {isLoginDirty && loginError && <div className={s.dirtyInpError}>{loginError}</div>}
          </label>

          <label className={s.form__label} htmlFor="password">
            <span>Password</span>
            <input
              id="password"
              className={s.form__input}
              type="text"
              value={password}
              onChange={(e) => onInputHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            {isPasswordDirty && passwordError && (
              <div className={s.dirtyInpError}>{passwordError}</div>
            )}
          </label>

          <label className={s.form__label} htmlFor="password">
            <span>Enter your password</span>
            <input id="password" className={s.form__input} type="text" />
          </label>

          <label className={s.form__label} htmlFor="tick">
            <input
              id="tick"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onInputHandler(e)}
            />
            I accept the agreement
            {(!isChecked && checkedError) && (<div className={classnames(s.dirtyInpError, {
              [s.checkboxInput]: !isChecked
            })}>{checkedError}</div> )}
          </label>

          <p>
            <input
              disabled={!isActiveSubmit}
              className={`${s.form__input} ${s.form__input__submit}`}
              type="submit"
              value="Sign Up"
            />
          </p>

          <p className={s.form__link}>
            Already a member?
            <Link to="/"> Sign In</Link>
          </p>
        </form>
      </div>

      <div>
        <p>
          <img src={SignUpImg} alt="" />
        </p>
      </div>
    </div>
  );
};

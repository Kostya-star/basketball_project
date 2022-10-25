import React, { ChangeEvent } from 'react';
import s from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import SignUpImg from '../../assets/img/imgSignUp/signup-Img.png';

export const SignUp = () => {
  const [name, setName] = React.useState('');
  const [isNameDirty, setIsNameDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('Mustn\'t be empty');

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(String(e.target.value).toLowerCase())) {
      setNameError('name is wrong')
      if (!e.target.value) {
        setNameError('Mustn\'t be empty')
      }
    }
    else {
      setNameError('')
    }
  };

  const onBlurHandler = () => {
    setIsNameDirty(true)
  }

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
              onBlur={onBlurHandler}
            />
            {(isNameDirty && nameError) && <div className={s.dirtyInpError}>{nameError}</div> }
          </label>

          <label className={s.form__label} htmlFor="login">
            <span>Login</span>
            <input id="login" className={s.form__input} type="text" />
          </label>

          <label className={s.form__label} htmlFor="password">
            <span>Password</span>
            <input id="password" className={s.form__input} type="text" />
          </label>

          <label className={s.form__label} htmlFor="password">
            <span>Enter your password</span>
            <input id="password" className={s.form__input} type="text" />
          </label>

          <label className={s.form__label} htmlFor="tick">
            <input id="tick" type="checkbox" /> I accept the agreement
          </label>

          <p>
            <input
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

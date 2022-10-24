/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react';
import s from './SignIn.module.scss';
import signInImg from '../../assets/img/imgSignIn/signin-img.png';
// import eyePasswordSvg from '../../assets/img/imgSignIn/close_eye.svg';
import { SignInPassword } from './SignInPassword/SignInPassword';

export const SignIn: React.FC = () => {
  return (
    <div className={s.signIn__wrapper}>
      <div className={s.signIn__form}>
        <form action="">
          <h1 className={s.signIn__form__heading}>Sign In</h1>
          <p className={s.signIn__form__groupOne}>
            <label className={s.signIn__form__label} htmlFor="username">
              Login
            </label>
            <input className={s.signIn__form__input} id="username" type="text" />
          </p>

          <p>
            <label className={s.signIn__form__label} htmlFor="username">
              Password
            </label>
            <SignInPassword />
          </p>
          
          <p>
            <input className={s.signIn__form__submit} type="submit" value="Sign In"></input>
          </p>
          <p>
            <span className={s.signIn__form__span}>
              Not a member yet?
              <a className={s.signIn__form__signInLink} href="#">
                Sign up
              </a>
            </span>
          </p>
        </form>
      </div>

      <div>
        <img className={s.signIn__img} src={signInImg} alt={s.signIn__basketballimg} />
      </div>
    </div>
  );
};

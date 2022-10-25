import React, { ChangeEvent } from 'react';
import s from './SignIn.module.scss';
import signInImg from '../../assets/img/imgSignIn/signin-img.png';
// import eyePasswordSvg from '../../assets/img/imgSignIn/close_eye.svg';
import { SignInPassword } from './SignInPassword/SignInPassword';

export const SignIn: React.FC = () => {

  const [loginInput, setLoginInput] = React.useState('');
  const [loginInputDirty, setLoginInputDirty] = React.useState(false);
  const [loginInputError, setLoginInputError] = React.useState("Can't be empty!");
  const [submitBtnEnabled, setSubmitBtnEnabled] = React.useState(false)

  React.useEffect(() => {
    if  (loginInputError) setSubmitBtnEnabled(false)
    else setSubmitBtnEnabled(true)
  }, [loginInputError])

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInput(e.target.value);
    const loginRegex = /^[a-zA-Z0-9]+$/;
    if (!loginRegex.test(String(e.target.value).toLowerCase())) {
      setLoginInputError('incorrect login');
      if (e.target.value.length === 0) {
        setLoginInputError("Can't be empty!");
      }
    } else setLoginInputError('');
  };

  const onBlurHandler = () => {
    setLoginInputDirty(true);
  };

  return (
    <div className={s.signIn__wrapper}>
      <div className={s.signIn__form}>
        <form action="">
          <h1 className={s.signIn__form__heading}>Sign In</h1>
          <label className={s.signIn__form__label} htmlFor="username">
            Login
            {loginInputDirty && loginInputError !== null && (
              <div style={{ color: 'red' }}>{loginInputError}</div>
            )}
            <input
              className={s.signIn__form__input}
              id="username"
              type="text"
              value={loginInput}
              onChange={(e) => onInputHandler(e)}
              onBlur={onBlurHandler}
            />
          </label>

          <SignInPassword />

          <p>
            <input disabled={!submitBtnEnabled} className={s.signIn__form__submit} type="submit" value="Sign In"></input>
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

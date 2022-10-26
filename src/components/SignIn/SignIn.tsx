import React, { ChangeEvent } from 'react';
import s from './SignIn.module.scss';
import signInImg from '../../assets/img/imgSignIn/signin-img.png';
// import eyePasswordSvg from '../../assets/img/imgSignIn/close_eye.svg';
import { SignInPassword } from './SignInPassword/SignInPassword';
import { Link } from 'react-router-dom';



export const SignIn: React.FC = () => {
  const [login, setLogin] = React.useState('');
  const [loginDirty, setLoginDirty] = React.useState(false);
  const [loginError, setLoginError] = React.useState("Can't be empty!");

  const [password, setPassword] = React.useState('');
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("Can't be empty!");

  const [submitBtnEnabled, setSubmitBtnEnabled] = React.useState(false);

  React.useEffect(() => {
    if (loginError || passwordError) setSubmitBtnEnabled(false);
    else setSubmitBtnEnabled(true);
  }, [loginError, passwordError]);

  const onLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    const loginRegex = /^[a-zA-Z0-9]+$/;
    if (!loginRegex.test(String(e.target.value).toLowerCase())) {
      setLoginError('incorrect login');
      if (!e.target.value) {
        setLoginError("Can't be empty!");
      }
    } else setLoginError('');
  };

  const onBlurHandler = () => {
    setLoginDirty(true);
  };



  return (
      <div className={s.signIn__wrapper}>
      <div className={s.signIn__form}>
        <form action="">
          <h1 className={s.signIn__form__heading}>Sign In</h1>
          <label className={s.signIn__form__label} htmlFor="username">
            <span>Login</span> 
            <input
              className={s.signIn__form__input}
              id="username"
              type="text"
              value={login}
              onChange={(e) => onLoginHandler(e)}
              onBlur={onBlurHandler}
              />
              {loginDirty && loginError && <div style={{ color: 'red' }}>{loginError}</div>}
          </label>

          <SignInPassword
            password={password}
            setPassword={(password) => setPassword(password)}
            passwordDirty={passwordDirty}
            setPasswordDirty={(password) => setPasswordDirty(password)}
            passwordError={passwordError}
            setPasswordError={(error) => setPasswordError(error)}
          />

          <p>
            <input
              disabled={!submitBtnEnabled}
              className={s.signIn__form__submit}
              type="submit"
              value="Sign In"
            ></input>
          </p>
          <p>
            <p className={s.signIn__form__link}>
              Not a member yet? &nbsp;
              <Link to='/SignUp' >
                Sign up
              </Link>
            </p>
          </p>
        </form>
      </div>

      <div className={s.signIn__img__block}>
        <p>
          <img src={signInImg} alt={s.signIn__basketballimg} />
        </p>
      </div>
    </div>
  );
};

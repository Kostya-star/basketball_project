import { ReactComponent as SignOutSVG } from '../../../assets/icons/menu__signOut.svg';
import '../../../scss/menu-common.scss';
import { useNavigate } from 'react-router-dom';
import { FC, memo } from 'react';

export const SignOut: FC = memo(() => {
  SignOut.displayName = 'SignOut'
  const navigate = useNavigate()

  const onHandleSignOut = () => {
    if(confirm('Do you really want to sign out?')) {
      window.localStorage.clear()
      return navigate('/SignIn');
    }
  }
  
  return (
    <>
      <div className="menu__signOut">
        <button onClick={onHandleSignOut} type="submit">
          <SignOutSVG />
          <span>Sign out</span>
        </button>
      </div>
    </>
  );
});

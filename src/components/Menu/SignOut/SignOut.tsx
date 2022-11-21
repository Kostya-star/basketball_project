import { ReactComponent as SignOutSVG } from '../../../assets/icons/menu__signOut.svg';
import '../../../scss/menu-common.scss';
import { useNavigate } from 'react-router-dom';
import { FC, memo } from 'react';

export const SignOut: FC = memo(() => {
  SignOut.displayName = 'SignOut';
  const navigate = useNavigate();

  const clearCache = () => {
    if ('caches' in window) {
      caches
        .keys()
        .then((names) => {
          names.forEach((name) => {
            void caches.delete(name);
          });
        })
        .catch((error) => {
          alert('Error when signing out');
          console.log(error);
        });
    }
    window.location.reload();
  };

  const onHandleSignOut = () => {
    if (confirm('Do you really want to sign out?')) {
      window.localStorage.setItem('isAuth', JSON.stringify(false));
      navigate('/SignIn');
      window.localStorage.removeItem('TOKEN');
      clearCache();
    }
  };

  return (
    <>
      <div className="menu__signOut">
        <button onClick={onHandleSignOut} type="submit" className='menu__button'>
          <SignOutSVG/>
          <span>Sign out</span>
        </button>
      </div>
    </>
  );
});

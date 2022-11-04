import { ReactComponent as SignOutSVG } from '../../../assets/icons/menu__signOut.svg';
import '../../../scss/menu-common.scss';

export const SignOut = () => {
  return (
    <>
      <div className="menu__signOut">
        <button type="submit">
          <SignOutSVG />
          <span>Sign out</span>
        </button>
      </div>
    </>
  );
};

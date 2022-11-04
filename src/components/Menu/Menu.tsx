import { Players } from './Players/Players';
import { SignOut } from './SignOut/SignOut';
import { Teams } from './Teams/Teams';
import '../../scss/menu-common.scss';

export const Menu = () => {
  return (
    <div className="menu__wrapper">
      <div className="menu__group">
        <Teams />
        <Players />
      </div>
      <SignOut />
    </div>
  );
};

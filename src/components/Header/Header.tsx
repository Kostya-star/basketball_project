import { ReactComponent as HeaderAvatar } from '../../assets/icons/header__avatar.svg';
import headerLogo from '../../assets/img/Header/header__logo.png';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <div className={s.header__wrapper}>
      <div className={s.header__logo}>
        <p>
          <img src={headerLogo} alt="logo" />
        </p>
      </div>
      <div className={s.header__credentials}>
        <span>Costya Danilov</span>
        <HeaderAvatar />
      </div>
    </div>
  );
};

import { ReactComponent as HeaderAvatar } from '../../assets/icons/userAvatar.svg';
import headerLogo from '../../assets/img/Header/header__logo.png';
import s from './Header.module.scss';
import { ReactComponent as ToggleButton } from '../../assets/icons/header_toggle__button.svg';
import { FC, LegacyRef } from 'react';
import classnames from 'classnames';

interface IHeaderProps {
  openMenu: boolean;
  toggleMenu: () => void;
}

export const Header: FC<IHeaderProps> = ({ openMenu, toggleMenu }) => {
  const userName = localStorage.getItem('userName');

  return (
    <div
      className={classnames(s.header__wrapper, {
        [s.header__wrapper_fixed]: openMenu,
      })}
    >
      <div className={s.header_toggle__button}>
        <button onClick={toggleMenu}>
          <ToggleButton />
        </button>
      </div>
      <div className={s.header__logo}>
        <p>
          <img src={headerLogo} alt="logo" />
        </p>
      </div>
      <div className={s.header__credentials}>
        <span>{userName}</span>
        <HeaderAvatar />
      </div>
    </div>
  );
};

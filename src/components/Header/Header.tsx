import { FC } from 'react';
import { ReactComponent as HeaderAvatar } from '../../assets/icons/header__avatar.svg';
import headerLogo from '../../assets/img/Header/header__logo.png';
import { useAppSelector } from '../../redux/hooks';
import s from './Header.module.scss';



export const Header = () => {
  const {name} = useAppSelector(({auth}) => ({
    name: auth.signInResp.name
  }))
  return (
    <div className={s.header__wrapper}>
      <div className={s.header__logo}>
        <p>
          <img src={headerLogo} alt="logo" />
        </p>
      </div>
      <div className={s.header__credentials}>
        <span>{name}</span>
        <HeaderAvatar />
      </div>
    </div>
  );
};
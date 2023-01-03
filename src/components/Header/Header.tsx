import { ReactComponent as HeaderAvatar } from '../../assets/icons/header__avatar.svg';
import headerLogo from '../../assets/img/Header/header__logo.png';
import { useAppSelector } from '../../redux/hooks';
import s from './Header.module.scss';
import { ReactComponent as ToggleButton } from '../../assets/icons/header_toggle__button.svg';
import { FC } from 'react';


interface IHeaderProps {
  setOpenMenu: () => void
}

export const Header: FC<IHeaderProps> = ({setOpenMenu }) => {
  const { name } = useAppSelector(({ auth }) => ({
    name: auth.signInResp.name,
  }));


  return (
    <div className={s.header__wrapper}>
      <div className={s.header_toggle__button}>
        <button onClick={setOpenMenu}>
          <ToggleButton />
        </button>
      </div>
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

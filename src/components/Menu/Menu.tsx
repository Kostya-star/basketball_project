import { ReactComponent as HeaderAvatar } from 'assets/icons/userAvatar.svg';
import { MenuBtn } from 'components/MenuBtn/MenuBtn';
import { FC, MouseEvent } from 'react';
import s from './Menu.module.scss'
// import 'scss/menu-common.scss';

interface IMenuProps {
  activeBtn: number;
  menuButtons: string[];
  userName: string;
  openMenu: boolean;
  setOpenMenu: (val: boolean) => void
  onClickMenuButtons: (index: number) => void;
}

export const Menu: FC<IMenuProps> = ({
  activeBtn,
  menuButtons,
  userName,
  openMenu,
  setOpenMenu,
  onClickMenuButtons,
}) => {

  const getMenuClass = (e: MouseEvent<HTMLDivElement>) => {
    const menuClass = document.querySelector(`.${s.menu__wrapper}`)

    if (menuClass === e.target) {
      setOpenMenu(false);
    }
  }

  return (
    <div onClick={getMenuClass} className={`${s.menu__wrapper} ${!openMenu && `${s.menu__close}`}`}>
      <div className={s.menu__group}>
        {openMenu && (
          <div className={s.menu__credentials}>
            <HeaderAvatar />
            <span>{userName}</span>
          </div>
        )}
        {menuButtons.map((button, index) => (
          <div className={s.menu__block} key={button + '_' + index}>
            <MenuBtn
              index={index}
              activeBtn={activeBtn === index}
              btnName={button}
              onClickHandle={onClickMenuButtons}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

import { useState, useEffect, FC } from 'react';
import '../../scss/menu-common.scss';
import { useNavigate } from 'react-router-dom';
import { MenuBtn } from '../MenuBtn/MenuBtn';
import { ReactComponent as HeaderAvatar } from '../../assets/icons/userAvatar.svg';


interface IMenuProps {
  activeBtn: number;
  menuButtons: string[];
  userName: string;
  openMenu: boolean;
  onClickMenuButtons: (index: number) => void;
}

export const Menu: FC<IMenuProps> = ({
  activeBtn,
  menuButtons,
  userName,
  openMenu,
  onClickMenuButtons,
}) => {
  return (
    <div className={`menu__wrapper ${!openMenu && 'menu__close'}`}>
      <div className="menu__group">
        {openMenu && (
          <div className="menu__credentials">
            <HeaderAvatar />
            <span>{userName}</span>
          </div>
        )}
        {menuButtons.map((button, index) => (
          <div className="menu__block" key={button + '_' + index}>
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

import { useState, useEffect, FC } from 'react';
import '../../scss/menu-common.scss';
import { useNavigate } from 'react-router-dom';
import { MenuBtn } from '../MenuBtn/MenuBtn';
import { ReactComponent as HeaderAvatar } from '../../assets/icons/userAvatar.svg';

export interface IMenuButtonProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

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

const menuButtons = ['Teams', 'Players', 'Sign out'];

interface IMenuProps {
  openMenu: boolean;
}

export const Menu: FC<IMenuProps> = ({ openMenu }) => {
  const [activeBtn, setActiveBtn] = useState<number | string>();
  const navigate = useNavigate();

  const onClickHandle = (index: number) => {
    setActiveBtn(index);

    menuButtons[index] === 'Teams' ? navigate('/Teams') : navigate('/Players');

    if (menuButtons[index] === 'Sign out') {
      onHandleSignOut();
    }
  };

  useEffect(() => {
    window.location.pathname.includes('Team') ? setActiveBtn(0) : setActiveBtn(1);
  }, []);

  // SIGNOUT LOGIC

  const onHandleSignOut = () => {
    window.localStorage.removeItem('isAuth');
    navigate('/SignIn');
    window.localStorage.removeItem('TOKEN');
    clearCache();
  };

  const userName = localStorage.getItem('userName');

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
              onClickHandle={onClickHandle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

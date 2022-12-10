import { useState } from 'react';
import '../../scss/menu-common.scss';
import { useNavigate } from 'react-router-dom';
import { MenuBtn } from '../MenuBtn/MenuBtn';

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

export const Menu = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const navigate = useNavigate();

  const onClickHandle = (index: number) => {
    setActiveBtn(index);
    menuButtons[index] === 'Teams' ? navigate('/Teams') : navigate('/Players');
    if (menuButtons[index] === 'Sign out') {
      onHandleSignOut();
    }
  };

  // SIGNOUT LOGIC

  const onHandleSignOut = () => {
    window.localStorage.removeItem('isAuth');
    navigate('/SignIn');
    window.localStorage.removeItem('TOKEN');
    clearCache();
  };

  return (
    <div className="menu__wrapper">
      <div className="menu__group">
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

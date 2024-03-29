import { Header } from 'components/Header/Header';
import { Menu } from 'components/Menu/Menu';
import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import s from './layout.module.scss';

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

const userName = localStorage.getItem('userName');

export const MainLayout: FC = () => {
  const [activeBtn, setActiveBtn] = useState<number>();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (window.location.pathname === '/Teams' && navigate('/Teams')) ||
      (window.location.pathname === '/Players' && navigate('/Players'));
  }, []);

  // MENU CODE

  const onClickMenuButtons = (index: number) => {
    setActiveBtn(index);

    menuButtons[index] === 'Teams' ? navigate('/Teams') : navigate('/Players');

    if (menuButtons[index] === 'Sign out') {
      onHandleSignOut();
    }
  };

  useEffect(() => {
    window.location.pathname.includes('Team') ? setActiveBtn(0) : setActiveBtn(1);
  }, []);



  const onHandleSignOut = () => {
    window.localStorage.removeItem('isAuth');
    navigate('/SignIn');
    window.localStorage.removeItem('TOKEN');
    clearCache();
  };

  return (
    <div>
      <Header
        userName={userName as string}
        openMenu={openMenu}
        toggleMenu={() => setOpenMenu(!openMenu)}
      />
      <div className={s.layout__container}>
        <Menu
          activeBtn={activeBtn as number}
          menuButtons={menuButtons}
          userName={userName as string}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          onClickMenuButtons={onClickMenuButtons}
        />
        <div className={s.layout__children__container}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// interface ContextType {
//   setHeading: (heading: string) => void;
// }
// export function useHeading() {
//   return useOutletContext<ContextType>()
// }

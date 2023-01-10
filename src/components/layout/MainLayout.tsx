import { FC, useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import s from './layout.module.scss';

export const MainLayout: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (window.location.pathname === '/Teams' && navigate('/Teams')) ||
      (window.location.pathname === '/Players' && navigate('/Players'));
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const onHandleClickOutsideMenu = (e: Event) => {
      if (document.querySelector('.menu__wrapper') === e.target) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', onHandleClickOutsideMenu);

    return () => {
      document.removeEventListener('mousedown', onHandleClickOutsideMenu);
    };
  }, [openMenu]);


  return (
    <div>
      <Header openMenu={openMenu} toggleMenu={() => setOpenMenu(!openMenu)} />
      <div className={s.layout__container}>
        <Menu openMenu={openMenu} />
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

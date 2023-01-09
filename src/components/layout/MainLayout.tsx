import { FC, useEffect, useState } from 'react';
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

  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div>
      <Header openMenu={openMenu} setOpenMenu={() => setOpenMenu(!openMenu)}/>
      <div className={s.layout__container}>
        <Menu openMenu={openMenu} closeMenu={() => setOpenMenu(false)}/>
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

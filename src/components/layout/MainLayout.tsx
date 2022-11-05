import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';

export const MainLayout: FC = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/SignIn' && location.pathname !== '/SignUp' && (
        <>
          <Header />
          <Menu />
        </>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

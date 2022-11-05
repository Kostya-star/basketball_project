import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';

export const MainLayout: FC = () => {

  return (
    <div>
      <Header />
      <Menu />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

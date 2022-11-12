import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import s from './layout.module.scss'

export const MainLayout: FC = () => {

  return (
    <div>
      <Header />
      <Menu />
      <div className={s.layout__container}>
        <Outlet/>
      </div>
    </div>
  );
};

import { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import s from './layout.module.scss';
import { Teams } from './../Teams/Teams';
import { TeamsEmpty } from '../Teams/TeamsEmpty/TeamsEmpty';
import { Players } from '../Players/Players';

export const MainLayout: FC = () => {
  return (
    <div>
      <Header />
      <div className={s.layout__container}>
        <Menu />
        <div className={s.layout__children__container}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

import { MainLayout } from 'components/layout/MainLayout';
import { NotFound } from 'pages/NotFound';
import { PlayerDetails } from 'pages/PlayerDetails';
import { Players } from 'pages/Players';
import { PlayersCreate } from 'pages/PlayersCreate';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { TeamCreate } from 'pages/TeamCreate';
import { TeamDetails } from 'pages/TeamDetails';
import { Teams } from 'pages/Teams';
import { FC, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

export const AppRouter: FC = () => {
  const navigate = useNavigate();

  const isAuth = window.localStorage.getItem('isAuth');

  useEffect(() => {
    if (!isAuth) {
      return navigate('/SignIn');
    }
  }, []);

  return (
    <Routes>
      {isAuth && (
        <Route path="/" element={<MainLayout />}>
          <Route path="Teams" element={<Teams />} />
          <Route path="TeamCreate" element={<TeamCreate />} />
          <Route path="TeamDetails" element={<TeamDetails />} />
          <Route path="Players" element={<Players />} />
          <Route path="PlayersCreate" element={<PlayersCreate />} />
          <Route path="PlayerDetails" element={<PlayerDetails />} />
        </Route>
      )}

      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

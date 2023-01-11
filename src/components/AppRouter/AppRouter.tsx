import { MainLayout } from 'components/layout/MainLayout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PlayerDetailsPage } from 'pages/PlayerDetailsPage';
import { PlayersCreatePage } from 'pages/PlayersCreatePage';
import { PlayersPage } from 'pages/PlayersPage';
import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { TeamCreatePage } from 'pages/TeamCreatePage';
import { TeamDetailsPage } from 'pages/TeamDetailsPage';
import { TeamsPage } from 'pages/TeamsPage';
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
          <Route path="Teams" element={<TeamsPage />} />
          <Route path="TeamCreate" element={<TeamCreatePage />} />
          <Route path="TeamDetails" element={<TeamDetailsPage />} />
          <Route path="Players" element={<PlayersPage />} />
          <Route path="PlayersCreate" element={<PlayersCreatePage />} />
          <Route path="PlayerDetails" element={<PlayerDetailsPage />} />
        </Route>
      )}

      <Route path="/SignUp" element={<SignUpPage />} />
      <Route path="/SignIn" element={<SignInPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

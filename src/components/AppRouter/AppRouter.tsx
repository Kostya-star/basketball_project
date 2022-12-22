import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { MainLayout } from '../layout/MainLayout';
import { Teams } from '../Teams/Teams';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { SignInPage } from '../../pages/SignInPage';
import { SignUpPage } from '../../pages/SignUpPage';
import { PlayersPage } from './../../pages/PlayersPage';
import { TeamCreatePage } from './../../pages/TeamCreatePage';
import { TeamsPage } from '../../pages/TeamsPage';
import { PlayersCreatePage } from '../../pages/PlayersCreatePage';

export const AppRouter: FC = () => {
  const navigate = useNavigate();

  const isAuth = window.localStorage.getItem('isAuth')

  useEffect(() => {
    if (!isAuth) {
      return navigate('/SignIn');
    }
  }, [])

  
  return (
    <Routes>
      {isAuth && (
        <Route path="/" element={<MainLayout />}>
          <Route path="Teams" element={<TeamsPage />} />
          <Route path="TeamCreate" element={<TeamCreatePage />} />
          <Route path="Players" element={<PlayersPage />} />
          <Route path="PlayersCreate" element={<PlayersCreatePage />} />
        </Route>
      )}

      <Route path="/SignUp" element={<SignUpPage />} />
      <Route path="/SignIn" element={<SignInPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

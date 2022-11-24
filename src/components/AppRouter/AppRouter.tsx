import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { MainLayout } from '../layout/MainLayout';
import { TeamsEmpty } from '../Teams/TeamsEmpty/TeamsEmpty';
import { Teams } from '../Teams/Teams';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { SignInPage } from '../../pages/SignInPage';
import { SignUpPage } from '../../pages/SignUpPage';
import { PlayersPage } from './../../pages/PlayersPage';
import { TeamCreatePage } from './../../pages/TeamCreatePage';
import { TeamsEmptyPage } from './../../pages/TeamsEmptyPage';
import { TeamsPage } from '../../pages/TeamsPage';
import { PlayersEmptyPage } from '../../pages/PlayersEmptyPage';
import { PlayersCreatePage } from '../../pages/PlayersCreatePage';

export const AppRouter: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuth } = useAppSelector(({ auth }) => ({
    isAuth: auth.isAuth,
  }));

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
          <Route path="TeamsEmpty" element={<TeamsEmptyPage />} />
          <Route path="TeamCreate" element={<TeamCreatePage />} />
          <Route path="Players" element={<PlayersPage />} />
          <Route path="PlayersEmpty" element={<PlayersEmptyPage />} />
          <Route path="PlayersEmpty" element={<PlayersEmptyPage />} />
          <Route path="PlayersCreate" element={<PlayersCreatePage />} />
        </Route>
      )}

      <Route path="/SignUp" element={<SignUpPage />} />
      <Route path="/SignIn" element={<SignInPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

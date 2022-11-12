import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { useAppSelector } from '../../redux/hooks';
import { MainLayout } from '../layout/MainLayout';
import { Players } from '../Players/Players';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import { NoTeams } from '../Teams/NoTeams';
import { Teams } from '../Teams/Teams';

export const AppRouter: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuth } = useAppSelector(({ auth }) => ({
    isAuth: auth.isAuth,
  }));

  useEffect(() => {
    if (location.pathname === '/' && !isAuth) return navigate('/signIn');
  });

  return (
    <Routes>
      {isAuth && (
        <Route path="/" element={<MainLayout />}>
          <Route path="/Teams" element={<Teams />} />
          <Route path="/NoTeams" element={<NoTeams />} />
          <Route path="/Players" element={<Players />} />
        </Route>
      )}

      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

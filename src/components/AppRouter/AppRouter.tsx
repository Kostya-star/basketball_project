import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { MainLayout } from '../layout/MainLayout';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';


export const AppRouter: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isAuth = window.localStorage.getItem('isAuth')

  useEffect(() => {
    if(location.pathname === '/' && !isAuth) return navigate('/signIn')
  })


  return (
      <Routes>
        {isAuth && <Route path="/" element={<MainLayout />}></Route>}

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};


import { createContext, FC, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { useAppSelector } from '../../redux/hooks';
import { MainLayout } from '../layout/MainLayout';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';


interface IAuthContext {
  setIsAuth: (isAuth: boolean) => void
}
export const Context = createContext<IAuthContext | null >(null);

export const AppRouter: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isAuth = useAppSelector(state => state.auth.isAuth)
  
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


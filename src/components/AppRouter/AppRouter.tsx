import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { MainLayout } from '../layout/MainLayout';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';

interface IAuthContext {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}
export const Context = createContext<IAuthContext | null>(null);

export const AppRouter = () => {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation()
  console.log(location);
  
  // useEffect(() => {
  //   if(isAuth && location.pathname === '/') setIsAuth(false)
  // }, [isAuth, location.pathname]);

  return (
    <Context.Provider value={{ isAuth, setIsAuth }}>
      <Routes>
        {isAuth && <Route path="/" element={<MainLayout />}></Route>}

        {!isAuth && (
          <>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Context.Provider>
  );
};

// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { NotFound } from '../../pages/NotFound';
// import { MainLayout } from '../layout/MainLayout';
// import { SignIn } from '../SignIn/SignIn';
// import { SignUp } from '../SignUp/SignUp';
// import { authRoutes, publicRoutes } from './../../routes';

// export const AppRouter = () => {
//   const isAuth = false;

//   return (
//     <Routes>
//       {isAuth &&
//         authRoutes.map(({ path, Component }) => (
//           <Route path={path} element={<Component />} key={path} />
//         ))}
//       {!isAuth &&
//         publicRoutes.map(({ path, Component }) => (
//           <Route path={path} element={<Component />} key={path} />
//         ))}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

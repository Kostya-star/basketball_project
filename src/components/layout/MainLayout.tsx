import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div>
      <Header />
      {(location.pathname === '/SignIn' || location.pathname === '/SignUp') ? null : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

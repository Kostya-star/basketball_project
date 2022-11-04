import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import './scss/all.scss';
import { SignUp } from './components/SignUp/SignUp';
import { NotFound } from './pages/NotFound';
import { MainLayout } from './components/layout/MainLayout';

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false)

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

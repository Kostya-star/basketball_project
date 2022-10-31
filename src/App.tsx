/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import './scss/all.scss';
import { SignUp } from './components/SignUp/SignUp';

export const PasswordContext = React.createContext();

const App: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <PasswordContext.Provider value={{ isPasswordVisible, setIsPasswordVisible }}>
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </PasswordContext.Provider>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

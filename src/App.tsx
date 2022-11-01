/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import './scss/all.scss';
import { SignUp } from './components/SignUp/SignUp';
// import { Auth } from './components/Auth/Auth';

const App: React.FC = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;

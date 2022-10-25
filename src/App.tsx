/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import './scss/all.scss';
import { SignUp } from './components/SignUp/SignUp';

const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

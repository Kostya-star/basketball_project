/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import { SignIn } from './components/SignIn/SignIn';
import s from './scss/all.module.scss'


const App: React.FC = () => {
  return (
    <div className={s.container}>
      <SignIn />
    </div>
  );
};

export default App;

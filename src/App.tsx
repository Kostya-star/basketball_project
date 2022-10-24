/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';

const App: React.FC = () => {
  return <div className="App">
    <SignIn/>
  </div>;
};

export default App;

const SignIn: React.FC = () => {
  return (
    <div className='container'>
      <div className='sign_in_wrapper'>
        <form action="">
          <h1 className='sign_in_heading'>Sign In</h1>
          <p>
            <label className='sign_in_label' htmlFor="username">Login</label>
            <input className='sign_in_input' id='username' type="text" />
          </p>
          <p>
            <label className='sign_in_label' htmlFor="username">Password</label>
            <input className='sign_in_input' id='username' type="text" />
          </p>
          <p>
            <input className="sign_in_submit" type='submit' value='Sign In'></input>
          </p>
          <p>
            Not a member yet? 
            <a className='sign_in_sign_up' href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import './scss/all.scss';
import { SignUp } from './components/SignUp/SignUp';
import { NotFound } from './pages/NotFound';

const App: React.FC = () => {
  return (
    <>
      {/* <div className="container"> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* </div> */}
    </>
  );
};

export default App;

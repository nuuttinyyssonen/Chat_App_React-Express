import Login from './components/Login/Login';
import Signup from './components/signup/Signup';
import Main from './components/Main';
import Profile from './components/Profile/Profile';
import PasswordReset from './components/Login/PasswordReset';
import RequestPasswordReset from './components/Login/RequestPasswordReset';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/main' element={<Main />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/chat/:id' element={<Main />} />
        <Route path='/reset-password/:token' element={<PasswordReset />}/>
        <Route path='/reset' element={<RequestPasswordReset />}/>
      </Routes>
    </div>
  );
};

export default App;

import Login from './components/Login/Login';
import Signup from './components/signup/Signup';
import Main from './components/Main';
import Profile from './components/Profile/Profile';
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
        {/* <Route path='/profile' element={<Profile />}/> */}
      </Routes>
    </div>
  );
};

export default App;

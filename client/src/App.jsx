import Login from './components/Login/Login';
import Signup from './components/signup/Signup';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;

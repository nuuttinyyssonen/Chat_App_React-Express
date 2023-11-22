import { useState } from 'react';
import LoginForm from './LoginForm';
import userService from '../../services/userService';
import { useDispatch } from 'react-redux';
import { setToken } from '../../reducers/tokenReducer';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username,
        password
      };
      const response = await userService.loginUser(user);
      console.log(response.token);
      dispatch(setToken(response.token))
      navigate('/main')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;

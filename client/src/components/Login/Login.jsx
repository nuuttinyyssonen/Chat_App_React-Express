import { useState } from 'react';
import LoginForm from './LoginForm';
import userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username,
        password
      };
      const response = await userService.loginUser(user);
      localStorage.setItem('token', response.token);
      navigate('/main');
    } catch (error) {
      if (error.response.data.error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage();
        }, 5000);
      };
    };
  };

  return (
    <div>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;

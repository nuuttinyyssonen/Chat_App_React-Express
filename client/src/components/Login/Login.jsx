import { useState } from 'react';
import LoginForm from './LoginForm';
const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
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

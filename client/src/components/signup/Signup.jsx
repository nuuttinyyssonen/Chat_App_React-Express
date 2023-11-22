import { useState } from 'react';
import SignupForm from './SignupForm';
import userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      setErrorMessage('Passwords are not the same');
      setTimeout(() => {
        setErrorMessage();
      }, 5000);
      return;
    };
    try {
      const user = {
        username,
        password,
        firstName,
        lastName,
        email
      };
      await userService.createUser(user);
      navigate('/');
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
      <SignupForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        passwordRepeat={passwordRepeat}
        setPasswordRepeat={setPasswordRepeat}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Signup;

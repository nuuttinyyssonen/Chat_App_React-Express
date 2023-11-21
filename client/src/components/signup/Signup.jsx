import { useState } from "react";
import SignupForm from './SignupForm';

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("here")
  }

  return(
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
      />
    </div>
  );
};

export default Signup;
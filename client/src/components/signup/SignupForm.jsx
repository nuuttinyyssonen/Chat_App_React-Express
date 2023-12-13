import '../../style/user/user.css';
import { Link } from 'react-router-dom';
const SignupForm = ({ username, setUsername, password, setPassword, passwordRepeat, setPasswordRepeat, firstName, setFirstName, lastName, setLastName, email, setEmail, onSubmit, errorMessage }) => {
  return (
    <div className='container' id='container-signup'>
      <h2>Register</h2>
      <p className='paragraph'>You and your friends aways connected.</p>
      { errorMessage && <p className='errorMsg'>{errorMessage}</p>}
      <form className='user-form' onSubmit={onSubmit}>
        <input id='firstName' className='user-input' placeholder="First name..." value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <input id='lastName' className='user-input' placeholder="Last name..." value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <input id='username' className='user-input' placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input id='email' className='user-input' placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input id='password' className='user-input' type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input id='passwordRepeat' className='user-input' type="password" placeholder="Repeat password..." value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
        <button id='Signup' className='action-btn' type="submit">Sign up</button>
      </form>
      <p className='link'>Already have an account? <Link id='signup-link' to='/'>Login here</Link></p>
    </div>
  );
};

export default SignupForm;

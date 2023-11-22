import '../../style/user/user.css';
import { Link } from 'react-router-dom';
const SignupForm = ({ username, setUsername, password, setPassword, passwordRepeat, setPasswordRepeat, firstName, setFirstName, lastName, setLastName, email, setEmail, onSubmit }) => {
  return (
    <div className='container' id='container-signup'>
      <h2>Login</h2>
      <p className='paragraph'>You and your friends aways connected.</p>
      <form className='login-form' onSubmit={onSubmit}>
        <input className='login-input' placeholder="First name..." value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <input className='login-input' placeholder="Last name..." value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <input className='login-input' placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input className='login-input' placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className='login-input' type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input className='login-input' type="password" placeholder="Repeat password..." value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
        <button className='login-btn' type="submit">Sign up</button>
      </form>
      <p className='link'>Already have an account? <Link className='signup-link' to='/'>Login here</Link></p>
    </div>
  );
};

export default SignupForm;

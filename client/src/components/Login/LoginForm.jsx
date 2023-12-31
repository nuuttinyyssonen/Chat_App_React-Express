import '../../style/user/user.css';
import { Link } from 'react-router-dom';
// Renders everything from login component.
const LoginForm = ({ username, setUsername, password, setPassword, onSubmit, errorMessage }) => {
  return (
    <div className='container' id='container-login'>
      <h2>Login</h2>
      <p className='paragraph'>Remember to get up every once in a while & stretch - you friends at chat.</p>
      {errorMessage && <p className='errorMsg'>{errorMessage}</p>}
      <form className='user-form' onSubmit={onSubmit}>
        <input id='username' className='user-input' placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input id='password' type='password' className='user-input' placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button id='loginBtn' className='action-btn' type="submit">Log In</button>
      </form>
      <p className='link'>Can&apos;t remember your password? <Link id='reset-link' to='/reset'>Reset your password here</Link></p>
      <p className='link'>Don&apos;t have an account yet? <Link id='signup-link' to='/signup'>Sign up here</Link></p>
    </div>
  );
};

export default LoginForm;

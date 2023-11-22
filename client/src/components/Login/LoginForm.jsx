import '../../style/user/user.css';
import { Link } from 'react-router-dom';
const LoginForm = ({ username, setUsername, password, setPassword, onSubmit }) => {
  return (
    <div className='container' id='container-login'>
      <h2>Login</h2>
      <p className='paragraph'>Remember to get up every once in a while & stretch - you friends at chat.</p>
      <form className='login-form' onSubmit={onSubmit}>
        <input className='login-input' placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' className='login-input' placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className='login-btn' type="submit">Log In</button>
      </form>
      <p className='link'>Don&apos;t have an account yet? <Link className='signup-link' to='/signup'>Sign up here</Link></p>
    </div>
  );
};

export default LoginForm;

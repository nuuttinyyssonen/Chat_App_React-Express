import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import verification from '../../services/verification';
import '../../style/user/user.css';
const PasswordReset = () => {
  const token = useParams().token;
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handles making request for changing password.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      setErrorMessage('Passwords are not the same');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    try {
      const passwordObject = {
        password
      };
      await verification.changePassword(passwordObject, token);
      // Users are automatically redirected after successful request.
      setSuccessMessage('Password has been changed successfully! Redirecting to login...');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 5000);
    } catch (error) {
      // Error is displayed if requirements for password is not met.
      if (error.response?.data) {
        setErrorMessage(error.response?.data);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }
  };

  return (
    <div className="container" id='container-login'>
      <form className='user-form' onSubmit={handleSubmit}>
        <h2 className="title">Reset your password</h2>
        <p className='paragraph'>Give a strong password.</p>
        {errorMessage && <p className="errorMsg">{errorMessage}</p>}
        {successMessage && <p className="successMsg">{successMessage}</p>}
        <input className="user-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input className='user-input' placeholder="Repeat password" type="password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)}/>
        <button className="action-btn" type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;

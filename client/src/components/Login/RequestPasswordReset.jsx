import { useState } from 'react';
import verification from '../../services/verification';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailObject = {
        emailAddress: email
      };
      await verification.RequestPasswordReseting(emailObject);
      setSuccessMessage('Verification link has been sent to your email.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      if (error.response?.data) {
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }
  };

  return (
    <div className="container" id='container-login'>
      <form className="user-form" onSubmit={handleSubmit}>
        <h2 className="title">Having Trouble logging in?</h2>
        <p className='paragraph'>Type your email and we send you verification to reset your password.</p>
        {successMessage && <p className="successMsg">{successMessage}</p>}
        {errorMessage && <p className="errorMsg">{errorMessage}</p>}
        <input className="user-input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button className="action-btn" type="submit">Send</button>
      </form>
    </div>
  );
};

export default RequestPasswordReset;

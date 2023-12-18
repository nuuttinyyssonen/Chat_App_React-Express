import ProfileDetails from './ProfileDetails';
import userService from '../../services/userService';
import { useEffect, useState, useRef } from 'react';
import '../../style/main/sliderButton.css';
const ProfileDetailsContainer = ({ isAuthenticated, navigate, currentUser }) => {
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);
  const [isUsernameEditMode, setIsUsernameEditMode] = useState(false);
  const [isStatusEditMode, setIsStatusEditMode] = useState(false);

  const [emailField, setEmailField] = useState('');
  const [email, setEmail] = useState('');

  const [usernameField, setUsernameField] = useState('');
  const [usernameValue, setUsernameValue] = useState('');

  const [statusField, setStatusField] = useState('');
  const [status, setStatus] = useState('');

  const [errorMessageUsername, setErrorMessageUsername] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageStatus, setErrorMessageStatus] = useState('');

  const statusRef = useRef(null);

  // Keeps email, username and status rendered when they are updated.
  useEffect(() => {
    setEmail(currentUser?.data?.email);
    setUsernameValue(currentUser?.data?.username);
    setStatus(currentUser?.data?.status);
  }, [currentUser]);

  // Handles email update
  const changeEmail = async () => {
    try {
      const data = await userService.updateUserField('email', { email: emailField });
      currentUser.setEmail(data.email);
      setIsEmailEditMode(false);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessageEmail(error.response?.data?.error);
        setTimeout(() => {
          setErrorMessageEmail('');
        }, [5000]);
      }
    }
  };

  // Handles username update
  const changeUsername = async () => {
    try {
      const data = await userService.updateUserField('username', { username: usernameField });
      currentUser.setUsername(data.username);
      setIsUsernameEditMode(false);
      // Params are also updated by navigating to updated /profile/updatedusername.
      navigate(`/profile/${data.username}`);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessageUsername(error.response?.data?.error);
        setTimeout(() => {
          setErrorMessageUsername('');
        }, [5000]);
      }
    }
  };

  // Handles status update
  const changeStatus = async () => {
    try {
      const data = await userService.updateUserField('status', { status: statusField });
      currentUser.setStatus(data.status);
      setIsStatusEditMode(false);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessageStatus("Status can't be longer than 20 characters");
        setTimeout(() => {
          setErrorMessageStatus('');
        }, 5000);
      }
    }
  };

  // Handles Dark mode updating.
  const changeTheme = async () => {
    try {
      const data = await userService.updateUserField('isDarkMode', { isDarkMode: !currentUser.data?.isDarkMode });
      currentUser.setChangeTheme(data.isDarkMode);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={currentUser.data?.isDarkMode ? { backgroundColor: 'black', color: 'white', borderRadius: '0px 0px 15px 15px' } : { backgroundColor: 'white' }} className='profileDetails'>
      {isAuthenticated && <div className='DarkModeContainer'>
        <p>Dark mode</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={currentUser.data?.isDarkMode}
            onChange={changeTheme}
          />
          <span className="slider round"></span>
        </label>
      </div>}
      <ProfileDetails
        statusRef={statusRef}
        isEditMode={isEmailEditMode}
        setIsEditMode={setIsEmailEditMode}
        user={currentUser}
        detail={email}
        type='email'
        updateDetail={changeEmail}
        field={emailField}
        setField={setEmailField}
        errorMessage={errorMessageUsername}
        isAuthenticated={isAuthenticated}
      />
      <ProfileDetails
        isEditMode={isUsernameEditMode}
        statusRef={statusRef}
        setIsEditMode={setIsUsernameEditMode}
        user={currentUser}
        detail={usernameValue}
        type='username'
        updateDetail={changeUsername}
        field={usernameField}
        setField={setUsernameField}
        errorMessage={errorMessageEmail}
        isAuthenticated={isAuthenticated}
      />
      <ProfileDetails
        field={statusField}
        setField={setStatusField}
        isAuthenticated={isAuthenticated}
        updateDetail={changeStatus}
        type='status'
        isEditMode={isStatusEditMode}
        statusRef={statusRef}
        setIsEditMode={setIsStatusEditMode}
        detail={status}
        user={currentUser}
        errorMessage={errorMessageStatus}
      />
    </div>
  );
};

export default ProfileDetailsContainer;

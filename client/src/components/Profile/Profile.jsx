import { useParams, useNavigate } from 'react-router-dom';
import useSearchedUser from '../../hooks/useSearchedUser';
import useAddFriend from '../../hooks/useAddFriend';
import useGetUserData from '../../hooks/useGetUserData';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import '../../style/main/profile.css';
import { VscArrowLeft } from 'react-icons/vsc';
import userService from '../../services/userService';
import { useState, useEffect, useRef } from 'react';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);
  const [isUsernameEditMode, setIsUsernameEditMode] = useState(false);

  const [emailField, setEmailField] = useState("");
  const [email, setEmail] = useState("");

  const [usernameField, setUsernameField] = useState("");
  const [usernameValue, setUsernameValue] = useState("");

  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");

  const username = useParams().username;
  const user = useSearchedUser(username);
  const currentUser = useGetUserData();
  const [newFriend] = useAddFriend();
  const navigate = useNavigate();

  const statusRef = useRef(null);
  const isAuthenticated = currentUser.data && currentUser.data?._id === user.data?._id;

  useEffect(() => {
    setEmail(currentUser?.data?.email);
    setUsernameValue(currentUser?.data?.username);
  }, [currentUser])

  const deleteProfile = async () => {
    if (window.confirm('Do you really want to delete this account?')) {
      try {
        await userService.deleteUser();
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeEmail = async () => {
    try {
      const data = await userService.updateUserField('email', { email: emailField });
      currentUser.setEmail(data.email);
      setIsEmailEditMode(false);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessageEmail(error.response?.data?.error)
        setTimeout(() => {
          setErrorMessageEmail("");
        }, [5000])
      }
    }
  };

  const changeUsername = async () => {
    try {
      const data = await userService.updateUserField('username', { username: usernameField })
      currentUser.setUsername(data.username);
      setIsUsernameEditMode(false);
      navigate(`/profile/${data.username}`);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessageUsername(error.response?.data?.error)
        setTimeout(() => {
          setErrorMessageUsername("");
        }, [5000])
      }
    }
  };

  const changeProfilePic = async () => {
    const reader = new FileReader();
    if (selectedImage) {
      reader.onload = async () => {
        try {
          const data = await userService.changeProfilePicture({ dataUrl: reader.result });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      reader.readAsDataURL(selectedImage)
      setSelectedImage(null)
    }
  };
  return (
    <div>
      <VscArrowLeft onClick={() => navigate('/main')} className='goBack'/>
      <div className='profileContainer'>
        <ProfileHeader
          user={user}
          addFriend={newFriend}
          username={username}
          isAuthenticated={isAuthenticated}
          deleteProfile={deleteProfile}
          setSelectedImage={setSelectedImage}
          changeProfilePic={changeProfilePic}
        />
        <ProfileDetails
          statusRef={statusRef}
          isEditMode={isEmailEditMode}
          setIsEditMode={setIsEmailEditMode}
          user={currentUser}
          detail={email}
          type='E-Mail'
          updateDetail={changeEmail}
          field={emailField}
          setField={setEmailField}
          errorMessage={errorMessageUsername}
        />
        <ProfileDetails
          isEditMode={isUsernameEditMode}
          statusRef={statusRef}
          setIsEditMode={setIsUsernameEditMode}
          user={currentUser}
          detail={usernameValue}
          type='Username'
          updateDetail={changeUsername}
          field={usernameField}
          setField={setUsernameField}
          errorMessage={errorMessageEmail}
        />
      </div>
    </div>
  );
};
export default Profile;

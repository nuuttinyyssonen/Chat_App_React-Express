import ProfileHeader from './ProfileHeader';
import { useEffect, useState } from 'react';
import userService from '../../services/userService';
const ProfileHeaderContainer = ({ user, isAuthenticated, newFriend, navigate, username, currentUser, errorMessage, successMessage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState();

  // Keeps profile pic rendered when it's updated.
  useEffect(() => {
    setImage(user.data?.profileImage);
  }, [user]);

  // Handles making request for changin profile picture.
  const changeProfilePic = async () => {
    const formData = new FormData();
    formData.append('file', selectedImage);
    try {
      const response = await userService.changeProfilePicture(formData);
      user.setPic(response.profileImage);
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Handles making request for deleting account.
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

  // Maps all of users friends and check if current user is already friends with it.
  const friendsMap = currentUser.data?.friends?.map(friend => friend._id === user.data?._id);
  const isAlreadyFriend = friendsMap && friendsMap.includes(true);

  return (
    <div style={currentUser.data?.isDarkMode ? { backgroundColor: 'black', color: 'white', borderRadius: '15px 15px 0px 0px' } : { backgroundColor: 'white' }}>
      <ProfileHeader
        user={user}
        addFriend={newFriend}
        username={username}
        isAuthenticated={isAuthenticated}
        deleteProfile={deleteProfile}
        setSelectedImage={setSelectedImage}
        changeProfilePic={changeProfilePic}
        selectedImage={selectedImage}
        image={image}
        currentUser={currentUser}
        isAlreadyFriend={isAlreadyFriend}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </div>
  );
};

export default ProfileHeaderContainer;

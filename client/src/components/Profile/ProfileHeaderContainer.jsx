import ProfileHeader from './ProfileHeader';
import { useEffect, useState } from 'react';
import userService from '../../services/userService';
const ProfileHeaderContainer = ({ user, isAuthenticated, newFriend, navigate, username, currentUser, errorMessage, successMessage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(user.data?.profileImage);
  }, [user]);

  const changeProfilePic = async () => {
    const formData = new FormData();
    formData.append('file', selectedImage);
    try {
      const response = await userService.changeProfilePicture(formData);
      user.setPic(response.profileImage)
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
    }
  };

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

  const friendsMap = currentUser.data?.friends?.map(friend => friend._id === user.data?._id);
  const isAlreadyFriend = friendsMap && friendsMap.includes(true);

  return (
    <div>
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

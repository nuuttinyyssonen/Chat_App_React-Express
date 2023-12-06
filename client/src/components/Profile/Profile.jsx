import { useParams, useNavigate } from 'react-router-dom';
import useSearchedUser from '../../hooks/useSearchedUser';
import useAddFriend from '../../hooks/useAddFriend';
import useGetUserData from '../../hooks/useGetUserData';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import '../../style/main/profile.css';
import { VscArrowLeft } from 'react-icons/vsc';
import userService from '../../services/userService';
import { useState } from 'react';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const username = useParams().username;
  const user = useSearchedUser(username);
  const currentUser = useGetUserData();
  const [newFriend] = useAddFriend();
  const navigate = useNavigate();
  const isAuthenticated = currentUser.data && currentUser.data._id === user.data._id;

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

  const changeProfilePic = async () => {
    const reader = new FileReader();
    if (selectedImage) {
      console.log("here")
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
        <ProfileDetails user={user}/>
      </div>
    </div>
  );
};
export default Profile;

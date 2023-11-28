import { useParams, useNavigate } from 'react-router-dom';
import useSearchedUser from '../../hooks/useSearchedUser';
import useAddFriend from '../../hooks/useAddFriend';
import useGetUserData from '../../hooks/useGetUserData';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import '../../style/main/profile.css';
import { VscArrowLeft } from "react-icons/vsc";
import userService from '../../services/userService';

const Profile = () => {
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
      />
      <ProfileDetails user={user}/>
    </div>
    </div>
  );
};
export default Profile;

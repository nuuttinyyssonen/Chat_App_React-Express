import { useParams, useNavigate } from 'react-router-dom';
import useSearchedUser from '../../hooks/useSearchedUser';
import useAddFriend from '../../hooks/useAddFriend';
import useGetUserData from '../../hooks/useGetUserData';
import '../../style/main/profile.css';
import { VscArrowLeft } from 'react-icons/vsc';
import ProfileDetailsContainer from './ProfileDetailsContainer';
import ProfileHeaderContainer from './ProfileHeaderContainer';

const Profile = () => {
  const username = useParams().username;
  const user = useSearchedUser(username);
  const currentUser = useGetUserData();
  const [newFriend] = useAddFriend();
  const navigate = useNavigate();
  const isAuthenticated = currentUser.data && currentUser.data?._id === user.data?._id;

  return (
    <div>
      <VscArrowLeft onClick={() => navigate('/main')} className='goBack'/>
      <div className='profileContainer'>
        <ProfileHeaderContainer
          user={user}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          newFriend={newFriend}
          navigate={navigate}
          username={username}
        />
        <ProfileDetailsContainer
          isAuthenticated={isAuthenticated}
          navigate={navigate}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};
export default Profile;

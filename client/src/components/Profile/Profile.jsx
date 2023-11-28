import { useParams, useNavigate } from 'react-router-dom';
import useSearchedUser from '../../hooks/useSearchedUser';
import useAddFriend from '../../hooks/useAddFriend';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import '../../style/main/profile.css';
import { VscArrowLeft } from "react-icons/vsc";

const Profile = () => {
  const username = useParams().username;
  const user = useSearchedUser(username);
  const [newFriend] = useAddFriend();
  const navigate = useNavigate();
  return (
    <div>
    <VscArrowLeft onClick={ () => navigate('/main')} className='goBack'/>
    <div className='profileContainer'>
      <ProfileHeader user={user} addFriend={newFriend} username={username}/>
      <ProfileDetails user={user}/>
    </div>
    </div>
  );
};
export default Profile;

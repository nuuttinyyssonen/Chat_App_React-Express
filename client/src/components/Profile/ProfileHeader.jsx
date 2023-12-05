import profile from '../../style/images/Profile_picture.png';
import { SlUserFollow, SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin, SlSettings } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
const ProfileHeader = ({ user, addFriend, isAuthenticated, deleteProfile }) => {
  const navigate = useNavigate();
  return (
    <div className='profileHeader'>
      <img className='ProfileImage' src={profile}/>
      {user.data &&
            <p className='PersonName'>{user.data.firstName} {user.data.lastName}
              {!isAuthenticated && <SlUserFollow onClick={() => addFriend(user.data.username)} className='follow'/>}
              {isAuthenticated && <SlSettings onClick={() => deleteProfile()} className='follow'/>}
            </p>}
      <p className='personDetails'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      <div className='socialMediaContainer'>
        <SlSocialInstagram className='socialMedia' />
        <SlSocialLinkedin className='socialMedia' />
        <SlSocialTwitter className='socialMedia' />
      </div>
    </div>
  );
};

export default ProfileHeader;

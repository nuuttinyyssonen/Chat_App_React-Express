import profile from '../../style/images/Profile_picture.png';
import { SlUserFollow, SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin, SlSettings, SlPencil } from 'react-icons/sl';

const ProfileHeader = ({ user, addFriend, isAuthenticated, deleteProfile, setSelectedImage, changeProfilePic }) => {
  return (
    <div className='profileHeader'>
      <div className='ProfileImageContainer'>
        <img className='ProfileImage' src={profile}/>
        <label htmlFor='fileInput'>
          <SlPencil className='editProfilePic'/>
        </label>
        <button onClick={() => changeProfilePic()}>save</button>
        <input
          type='file'
          id='fileInput'
          style={{ display: 'none' }}
          onChange={e => setSelectedImage(e.target.files[0])}
        />
      </div>
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

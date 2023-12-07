import profile from '../../style/images/Profile_picture.png';
import { SlUserFollow, SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin, SlSettings, SlPencil, SlTrash } from 'react-icons/sl';

const ProfileHeader = ({ user, addFriend, isAuthenticated, deleteProfile, setSelectedImage, changeProfilePic, selectedImage }) => {
  return (
    <div className='profileHeader'>

      <div className='ProfileImageContainer'>
        {!selectedImage && <img className='ProfileImage' style={{ width: '200px', height: '200px', borderRadius: "50%" }} src={profile}/>}
        {selectedImage && (
          <div className='imagePreview'>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: '200px', height: '200px', borderRadius: "50%", marginTop: "10px" }}
            />
          </div>
        )}

        <label htmlFor='fileInput'>
          <SlPencil className='editProfilePic'/>
        </label>
        <form onSubmit={changeProfilePic}>
          <input
            type='file'
            name='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={e => setSelectedImage(e.target.files[0])}
          />
          <label htmlFor='fileInput'>
            {selectedImage && <button type='submit'>save</button>}
          </label>
        </form>
      </div>
      {selectedImage && <button onClick={() => setSelectedImage(null)}>discard</button>}
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

import profile from '../../style/images/Profile_picture.png';
import { SlUserFollow, SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin, SlSettings, SlPencil } from 'react-icons/sl';

const ProfileHeader = ({
  user,
  addFriend,
  isAuthenticated,
  deleteProfile,
  setSelectedImage,
  changeProfilePic,
  selectedImage,
  image,
  isAlreadyFriend,
  errorMessage,
  successMessage
}) => {
  return (
    <div className='profileHeader'>
      <div className='ProfileImageContainer'>
        {!selectedImage && !user.data?.profileImage && <img className='ProfileImage' style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '10px' }} src={profile}/>}
        {!selectedImage && user.data?.profileImage && image && <img className='ProfileImage' style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '10px' }} src={image}/>}
        {selectedImage && (
          <div className='imagePreview'>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '10px' }}
            />
          </div>
        )}

        <label htmlFor='fileInput'>
          {isAuthenticated && <SlPencil className='editProfilePic'/>}
        </label>
        <input
          type='file'
          name='file'
          id='fileInput'
          style={{ display: 'none' }}
          onChange={e => setSelectedImage(e.target.files[0])}
        />
      </div>
      <div className='profilePicActionButtons'>
        <label htmlFor='fileInput'>
          {selectedImage && <button className='profilePicActionBtn' onClick={() => changeProfilePic()} type='submit'>save</button>}
        </label>
        {selectedImage && <button className='profilePicActionBtn' onClick={() => setSelectedImage(null)}>discard</button>}
      </div>
      {user.data &&
        <p className='PersonName'>{user.data.firstName} {user.data.lastName}
          {!isAuthenticated && !isAlreadyFriend && <SlUserFollow onClick={() => addFriend(user.data.username)} className='follow'/>}
          {isAuthenticated && <SlSettings onClick={() => deleteProfile()} className='follow'/>}
        </p>}
        {successMessage && <p className='successMsg'>{successMessage}</p>}
        {errorMessage && <p className='errorMsg'>{errorMessage}</p>}
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

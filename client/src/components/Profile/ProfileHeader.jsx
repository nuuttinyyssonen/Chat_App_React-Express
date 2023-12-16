import profile from '../../style/images/Profile_picture.png';
import { SlUserFollow, SlSettings, SlPencil } from 'react-icons/sl';

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
        {/* If user has custom profle pic, it's displayed otherwise default pic is displayed. */}
        {!selectedImage && !user.data?.profileImage && <img className='ProfileImage' style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '10px' }} src={profile}/>}
        {!selectedImage && user.data?.profileImage && image && <img className='ProfileImage' style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '10px' }} src={image}/>}
        {/* Image preview when changing profile picture */}
        {selectedImage && (
          <div className='imagePreview'>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '10px' }}
            />
          </div>
        )}
        {/* if user is authenticated, user is allowed to change profile picture. */}
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
      {/* If user is authenticated, user is allowed to delete account.
      If user is not authenticated and viewed user is not in current user's friends, they can add him. */}
      {user.data &&
        <p className='PersonName'>{user.data.firstName} {user.data.lastName}
          {!isAuthenticated && !isAlreadyFriend && <SlUserFollow onClick={() => addFriend(user.data.username)} id='addFriend' className='follow'/>}
          {isAuthenticated && <SlSettings id='deleteUser' onClick={() => deleteProfile()} className='follow'/>}
        </p>}
      {successMessage && <p className='successMsg'>{successMessage}</p>}
      {errorMessage && <p className='errorMsg'>{errorMessage}</p>}
    </div>
  );
};

export default ProfileHeader;

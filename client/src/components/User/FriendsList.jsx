import profilePic from '../../style/images/Profile_picture.png';
const FriendsList = ({ friends }) => {
  return (
    friends.friends && (
      <div className='friendsContainer'>
        {friends.friends.map((friend, key) => (
          <div className='friendsList' key={key}>
            <img className="profilePicInUserList" src={profilePic} />
            <p className='name'>{friend.firstName}</p>
            <p className='name'>{friend.lastName}</p>
          </div>
        ))}
      </div>
    )
  );
};

export default FriendsList;

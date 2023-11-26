import profilePic from '../../style/images/Profile_picture.png';
import { useNavigate } from 'react-router-dom';
const FriendsList = ({ friends, chats }) => {
  const navigate = useNavigate();
  const navigateToChat = (id, firstName, lastName) => {
    navigate(`/chat/${id}`, { state: { firstName, lastName } });
  };
  const listMap = () => (
    friends.map((friend, key) => (
      <div className='friendsList' key={key} onClick={() => navigateToChat(chats[key]._id, friend.firstName, friend.lastName)}>
        <img className="profilePicInUserList" src={profilePic} />
        <p className='name'>{friend.firstName}</p>
        <p className='name'>{friend.lastName}</p>
      </div>
    ))
  );
  return (
    friends && (
      <div className='friendsContainer'>
        {listMap()}
      </div>
    )
  );
};

export default FriendsList;

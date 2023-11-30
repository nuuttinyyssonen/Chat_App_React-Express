import profilePic from '../../style/images/Profile_picture.png';
import { useNavigate } from 'react-router-dom';
import socket from '../../socketConfig';
import { useEffect, useState } from 'react';

const FriendsList = ({ friends, chats }) => {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigateToChat = (id, firstName, lastName) => {
    navigate(`/chat/${id}`, { state: { firstName, lastName } });
  };

  useEffect(() => {
    socket.on('online', (data) => {
      console.log(data)
      setOnlineUsers(prev => ([...prev, data]));
    });
  }, [socket]);

  const listMap = () => (
    friends.map((friend, key) => {
      const fullMessage = chats[key].messages.length > 0 ? chats[key].messages[chats[key].messages.length - 1].message : ""
      const message = fullMessage.length > 30 ? fullMessage.substring(0, 30) + "..." : fullMessage;
      const isOnline = onlineUsers.includes(friend._id)
      console.log(onlineUsers)
      return (
        <div id='friend' className='friendsList' key={key} onClick={() => navigateToChat(chats[key]._id, friend.firstName, friend.lastName)}>
        {isOnline && <p>Dot</p>}
          <img className="profilePicInUserList" src={profilePic} style={{ width: '60px' }} />
          <div className='friendDetails'>
            <div className='friendName'>
              <p className='name'>{friend.firstName}</p>
              <p className='name'>{friend.lastName}</p>
            </div>
            <p className='latestMessage'>{message}</p>
          </div>
        </div>
      );
    })
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

import profilePic from '../../style/images/Profile_picture.png';
import { useNavigate } from 'react-router-dom';
import socket from '../../socketConfig';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoDotFill } from 'react-icons/go';
import { initalizeUsers } from '../../reducers/onlineUserReducer';

const FriendsList = ({ chats, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToChat = (id) => {
    navigate(`/chat/${id}`);
  };

  const onlineUsers = useSelector(({ onlineUsers }) => {
    return onlineUsers;
  });

  useEffect(() => {
    socket.on('online', (data) => {
      dispatch(initalizeUsers(data));
    });
  }, [socket]);

  const listMap = () => {
    return data.data.chats.map((chat, key) => {
      const fullMessage = chats[key].messages.length > 0 ? chats[key].messages[chats[key].messages.length - 1].message : '';
      const message = fullMessage.length > 30 ? fullMessage.substring(0, 30) + '...' : fullMessage;
      const isOnline = chat.users.map(user => onlineUsers.includes(user._id));
      const isPrivateChat = chat.users.length === 2;
      const userIndex = isPrivateChat ? (chat.users[0].username === data.data.username ? 1 : 0) : -1;
      return (
        <div id='friend' className='friendsList' key={key} onClick={() => navigateToChat(chats[key]._id)}>
          <GoDotFill className={isOnline[userIndex] ? 'onlineStatus' : 'offlineStatus'}/>
          {!chat.users[userIndex]?.profileImage && <img className="profilePicInUserList" src={profilePic} style={{ width: '60px' }} />}
          {chat.users[userIndex]?.profileImage && <img className="profilePicInUserList" src={chat.users[userIndex]?.profileImage} style={{ width: '60px', height: '60px', borderRadius: "50%" }} />}
          <div className='friendDetails'>
            {userIndex !== -1 && (
              <div className='friendName'>
                <p>{chat.users[userIndex].username}</p>
              </div>
            )}
            {userIndex === -1 && (
              <div>
                <p>{chat.chatName}</p>
              </div>
            )}
            <p className='latestMessage'>{message}</p>
          </div>
        </div>
      );
    });
  };
  return (
    data.data && (
      <div className='friendsContainer'>
        {listMap()}
      </div>
    )
  );
};

export default FriendsList;

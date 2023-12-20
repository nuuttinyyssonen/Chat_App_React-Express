import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../socketConfig';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initalizeUsers } from '../../reducers/onlineUserReducer';
import Contact from './Contact';

const ContactList = ({ chats, data, setShowContactList }) => {
  const navigate = useNavigate();
  const urlId = useParams().id;
  const dispatch = useDispatch();
  const navigateToChat = (id) => {
    navigate(`/chat/${id}`);
    setShowContactList(false);
  };

  // Retrieves the list of online users from the Redux store.
  const onlineUsers = useSelector(({ onlineUsers }) => {
    return onlineUsers;
  });

  // Socket listener to update online users.
  useEffect(() => {
    socket.on('online', (data) => {
      dispatch(initalizeUsers(data));
    });
  }, [socket]);
  // Function to map and render each contact in the list.
  const listMap = () => {
    return data.data.chats.map((chat, key) => {
      // Gets latest message of each chat and shortens it if it's too long.
      const fullMessage = chats[key].messages.length > 0 ? chats[key].messages[chats[key].messages.length - 1].message : '';
      const message = fullMessage.length > 30 ? fullMessage.substring(0, 30) + '...' : fullMessage;

      // Determines online status and chat type (private/group).
      const isOnline = chat.users.map(user => onlineUsers.includes(user._id));
      const isPrivateChat = chat.users.length === 2;
      const userIndex = isPrivateChat ? (chat.users[0]?.username === data.data?.username ? 1 : 0) : -1;

      return (
        <div id='friend' key={key} onClick={() => navigateToChat(chats[key]._id)}>
          <Contact
            userIndex={userIndex}
            chat={chat}
            isOnline={isOnline}
            message={message}
            urlId={urlId}
          />
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

export default ContactList;

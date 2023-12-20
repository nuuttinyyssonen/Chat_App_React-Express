import ChatInputContainer from './ChatInputContainer';
import ChatArea from './ChatArea';
import ChatHeader from './ChatHeader';
import { useState, useEffect } from 'react';
import socket from '../../socketConfig';
import { useParams } from 'react-router-dom';
import useGetUserData from '../../hooks/useGetUserData';
import useGetChat from '../../hooks/useGetChat';

// Main Chat component
const Chat = ({ isMobile, showContactList, setShowContactList }) => {
  const [typingText, setTypingText] = useState('');
  const chat = useGetChat();
  const user = useGetUserData();
  const id = useParams().id;

  useEffect(() => {
    // Online users are stored inside of a set in backend and Redux in frontend.
    if (user.data) {
      socket.emit('login', user.data._id);
    }
  }, [user]);

  // Watches for display emits and sets typing indicator.
  useEffect(() => {
    socket.on('display', (data) => {
      if (data.typing === true) {
        const temp = { text: `${data.user.data.username} is typing...`, room: data.room };
        setTypingText(temp);
      } else {
        setTypingText('');
      }
    });

    return () => {
      socket.off('display');
    };
  }, []);

  const containerStyle = {
    display: isMobile && showContactList ? 'none' : 'flex',
    backgroundColor: user.data?.isDarkMode ? '#222222' : 'white'
  };

  return (
    <div style={containerStyle} className="chat-container">
      <ChatHeader
        isMobile={isMobile}
        setShowContactList={setShowContactList}
        user={user}
        chat={chat}
      />
      <ChatArea
        typingText={typingText}
        id={id}
        user={user}
        chat={chat}
      />
      <ChatInputContainer
        typingText={typingText}
        user={user}
        id={id}
      />
    </div>
  );
};

export default Chat;

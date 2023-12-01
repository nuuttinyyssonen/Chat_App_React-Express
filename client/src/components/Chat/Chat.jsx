import ChatInput from './ChatInput';
import ChatArea from './ChatArea';
import ChatHeader from './ChatHeader';
import { useState, useEffect } from 'react';
import socket from '../../socketConfig';
import { useParams } from 'react-router-dom';
import useGetUserData from '../../hooks/useGetUserData';
import useGetChat from '../../hooks/useGetChat';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [typingText, setTypingText] = useState('');

  const user = useGetUserData();
  const id = useParams().id;
  const chat = useGetChat();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    if (user.data) {
      socket.emit('login', user.data._id);
    }

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }, [user]);

  const sendMessage = () => {
    if (user) {
      socket.emit('message', { message, room: id, userId: user.data._id });
      setMessage('');
    }
  };

  let timeout;
  const typingTimeout = () => {
    setTyping(false);
    socket.emit('typing', { user: user, typing: false, room: chat.chat._id });
  }

  const handleKeyDown = (e) => {
    if (e.which !== 13) {
      setTyping(true);
      socket.emit('typing', { user: user, typing: true, room: chat.chat._id });
      clearTimeout(timeout)
      timeout = setTimeout(typingTimeout, 3000);
    } else {
      typingTimeout();
      clearTimeout(timeout);
      sendMessage();
    }
  };

  useEffect(() => {
    socket.on('display', (data) => {
      if (data.typing === true) {
        setTypingText(`${data.user.data.username} is typing...`);
      } else {
        setTypingText('');
      }
    });

    return () => {
      socket.off('display');
    };
  }, []);

  return (
    <div className="chat-container">
      <ChatHeader
        user={user}
      />
      <ChatArea
        typingText={typingText}
        id={id}
        user={user}
      />
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleKeyDown={handleKeyDown}
        sendMessage={sendMessage}
        typingText={typingText}
        user={user}
      />
    </div>
  );
};

export default Chat;

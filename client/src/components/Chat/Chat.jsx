import ChatInputContainer from './ChatInputContainer';
import ChatArea from './ChatArea';
import ChatHeader from './ChatHeader';
import { useState, useEffect } from 'react';
import socket from '../../socketConfig';
import { useParams } from 'react-router-dom';
import useGetUserData from '../../hooks/useGetUserData';
import useGetChat from '../../hooks/useGetChat';

const Chat = () => {
  const [typingText, setTypingText] = useState('');
  const chat = useGetChat();
  const user = useGetUserData();
  const id = useParams().id;

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

  return (
    <div className="chat-container">
      <ChatHeader
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

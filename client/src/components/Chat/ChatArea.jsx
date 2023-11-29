import { useState, useEffect, useRef } from 'react';
import socket from '../../socketConfig';
import { useParams } from 'react-router-dom';
import useGetChat from '../../hooks/useGetChat';
import useGetUserData from '../../hooks/useGetUserData';
import ChatMessages from './ChatMessages';
const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const id = useParams().id;
  const chat = useGetChat();
  const user = useGetUserData();
  const chatContainerRef = useRef(null);

  socket.emit('joinRoom', id);
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off('receive_message');
  }, [socket]);

  return (
    <div className="chatContainer">
      <ChatMessages
        messages={messages}
        user={user}
        id={id}
        chat={chat}
      />
    </div>
  );
};

export default ChatArea;

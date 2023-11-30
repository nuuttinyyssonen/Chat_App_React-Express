import { useState, useEffect } from 'react';
import socket from '../../socketConfig';
import useGetChat from '../../hooks/useGetChat';
import ChatMessages from './ChatMessages';
const ChatArea = ({ typingText, user, id }) => {
  const [messages, setMessages] = useState([]);
  const chat = useGetChat();

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
        typingText={typingText}
      />
    </div>
  );
};

export default ChatArea;

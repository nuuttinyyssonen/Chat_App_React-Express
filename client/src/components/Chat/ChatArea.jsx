import { useEffect, useState } from 'react';
import socket from '../../socketConfig';
import ChatMessages from './ChatMessages';
const ChatArea = ({ typingText, user, id, chat }) => {
  const [errorMessage, setErrorMessage] = useState("");

  socket.emit('joinRoom', id);
  useEffect(() => {
    socket.on('receive_message', (data) => {
      chat.addMessage(data);
    });
    socket.on('receive_image', (data) => {
      chat.addImage(data);
    });
    socket.on('updated_chat', (data) => {
      console.log(data)
      chat.setChat(data)
    });
    socket.on('error', (data) => {
      setErrorMessage(data);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000)
    });
    return () => {
      socket.off('receive_message');
      socket.off('receive_image');
      socket.off('updated_chat');
      socket.off('error');
    };
  }, [socket]);

  const handleDeleteMessage = async (chatId, messageId) => {
    if (window.confirm('do you really want to delete this message')) {
      socket.emit('delete_message', { message: messageId, room: chatId });
    }
  };

  const handleDeleteImage = async (chatId, imageId) => {
    if (window.confirm('do you really want to delete this image')) {
      socket.emit('delete_image', { image: imageId, room: chatId });
    }
  };

  return (
    <div className="chatContainer">
      <ChatMessages
        user={user}
        chat={chat}
        typingText={typingText}
        handleDeleteMessage={handleDeleteMessage}
        handleDeleteImage={handleDeleteImage}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default ChatArea;

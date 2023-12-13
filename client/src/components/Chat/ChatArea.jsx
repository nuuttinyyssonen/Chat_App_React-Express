import { useEffect } from 'react';
import socket from '../../socketConfig';
import useGetChat from '../../hooks/useGetChat';
import ChatMessages from './ChatMessages';
import chatService from '../../services/chatService';
const ChatArea = ({ typingText, user, id }) => {
  const chat = useGetChat();

  socket.emit('joinRoom', id);
  useEffect(() => {
    socket.on('receive_message', (data) => {
      chat.addMessage(data);
    });
    socket.on('receive_image', (data) => {
      chat.addImage(data);
    });
    return () => {
      socket.off('receive_message');
      socket.off('receive_image');
    };
  }, [socket]);

  const handleDeleteMessage = async (chatId, messageId) => {
    if (window.confirm('do you really want to delete this message')) {
      try {
        const data = await chatService.deleteMessage(chatId, messageId);
        chat.setChat(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteImage = async (chatId, imageId) => {
    if (window.confirm('do you really want to delete this image')) {
      try {
        const data = await chatService.deleteImage(chatId, imageId);
        chat.setChat(data);
      } catch (error) {
        console.log(error);
      }
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
      />
    </div>
  );
};

export default ChatArea;

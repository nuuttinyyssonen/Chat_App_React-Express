import { useState } from 'react';
import { Buffer } from 'buffer';
import socket from '../../socketConfig';
import useGetChat from '../../hooks/useGetChat';
import ChatInput from './ChatInput';
import ImagePreview from './ImagePreview';

const ChatInputContainer = ({ typingText, user, id }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState('');

  const chat = useGetChat();

  const sendMessage = () => {
    if (!id) {
      setMessage("");
      return;
    }
    if (selectedImage && user) {
      const reader = new FileReader();
      console.log(selectedImage.name)
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const buffer = Buffer.from(arrayBuffer);
        socket.emit('image', { buffer, room: id, userId: user.data._id, file: selectedImage.name });
      };
      reader.readAsArrayBuffer(selectedImage);
      setSelectedImage(null);
    } else if (message && user) {
      socket.emit('message', { message, room: id, userId: user.data._id });
      setMessage('');
    }
  };

  let timeout;
  const typingTimeout = () => {
    setTyping(false);
    socket.emit('typing', { user, typing: false, room: chat.chat._id });
  };

  const handleKeyDown = (e) => {
    if (!id) {
      return;
    }
    if (e.which !== 13) {
      setTyping(true);
      socket.emit('typing', { user, typing: true, room: chat.chat._id });
      clearTimeout(timeout);
      timeout = setTimeout(typingTimeout, 3000);
    } else {
      typingTimeout();
      clearTimeout(timeout);
      sendMessage();
    }
  };

  return (
    <div className="chatInput-container">
      <ImagePreview
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
      />
      <ChatInput
        handleKeyDown={handleKeyDown}
        typingText={typingText}
        user={user}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        setSelectedImage={setSelectedImage}
        id={id}
      />
    </div>
  );
};

export default ChatInputContainer;

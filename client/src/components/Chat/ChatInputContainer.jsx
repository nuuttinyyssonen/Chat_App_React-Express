import { useState } from 'react';
import { Buffer } from 'buffer';
import socket from '../../socketConfig';
import useGetChat from '../../hooks/useGetChat';
import ChatInput from './ChatInput';
import ImagePreview from './ImagePreview';

const ChatInputContainer = ({ typingText, user, id }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');

  const chat = useGetChat();

  // This handles both sending message and image.
  const sendMessage = () => {
    if (!chat.chat?._id || !id) {
      setMessage('');
      setSelectedImage('');
      return;
    }
    if (selectedImage && user) {
      const reader = new FileReader();
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
    socket.emit('typing', { user, typing: false, room: chat.chat._id });
  };

  // sends data of typing indicator if anything other than enter is pressed and user is in chat room.
  const handleKeyDown = (e) => {
    if (!chat.chat?._id || !id) {
      return;
    }
    if (e.which !== 13) {
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
    <div style={user.data?.isDarkMode ? { backgroundColor: 'black', color: 'white', border: '1px solid black' } : { backgroundColor: 'white' }} className="chatInput-container">
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

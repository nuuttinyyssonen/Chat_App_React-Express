import { SlPaperPlane } from 'react-icons/sl';
import socket from '../../socketConfig';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUserData from '../../hooks/useGetUserData';
const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [typingText, setTypingText] = useState('');

  const user = useGetUserData();
  const id = useParams().id;
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }, []);

  const sendMessage = () => {
    if (user) {
      socket.emit('message', { message, room: id, userId: user.data._id });
      setMessage('');
    }
  };

  let timeoutId;
  let timeout;

  const typingTimeout = () => {
    setTyping(false);
    socket.emit('typing', { user: user, typing: false });
  }

  const handleKeyDown = (e) => {
    if (e.which !== 13) {
      setTyping(true);
      socket.emit('typing', { user: user, typing: true });
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
        console.log(data.user.data.username)
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
    <div className="chatInput-container">
      <input onKeyDown={handleKeyDown} id='chatInput' className="chatInput" placeholder="Write something..." value={message} onChange={(e) => setMessage(e.target.value)}/>
      <SlPaperPlane id='send' className="send-btn" onClick={sendMessage}/>
      <div>{typingText}</div>
    </div>
  );
};

export default ChatInput;

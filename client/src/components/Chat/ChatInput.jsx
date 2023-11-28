import { SlPaperPlane } from 'react-icons/sl';
import socket from '../../socketConfig';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUserData from '../../hooks/useGetUserData';
const ChatInput = () => {
  const [message, setMessage] = useState('');
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

  return (
    <div className="chatInput-container">
      <input id='chatInput' className="chatInput" placeholder="Write something..." value={message} onChange={(e) => setMessage(e.target.value)}/>
      <SlPaperPlane id='send' className="send-btn" onClick={sendMessage}/>
    </div>
  );
};

export default ChatInput;

import { SlPaperPlane } from 'react-icons/sl';
import socket from '../../socketConfig';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const ChatInput = () => {
  const [message, setMessage] = useState("");
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
    socket.emit('message', { message: message, room: id });
    setMessage('');
  };

  return (
    <div className="chatInput-container">
      <input className="chatInput" placeholder="Write something..." value={message} onChange={(e) => setMessage(e.target.value)}/>
      <SlPaperPlane className="send-btn" onClick={sendMessage}/>
    </div>
  );
};

export default ChatInput;

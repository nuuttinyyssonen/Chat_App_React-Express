import { useState, useEffect } from "react";
import socket from '../../socketConfig';
import { useParams } from "react-router-dom";
const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const id = useParams().id;

  socket.emit('joinRoom', id);
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data])
    });
    return () => socket.off('receive_message');
  }, [socket]);

  const messagesMap = () => {
    return messages.map((message, key) => {
      console.log(message)
      if (message.room === id) {
        console.log(message)
        return (
          <div key={key}>
            <p>{message.message}</p>
          </div>
        )
      }
      return null;
    })
  }

  return (
    <div>
      {messages && messagesMap()}
    </div>
  );
};

export default ChatArea;

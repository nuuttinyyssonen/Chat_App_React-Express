import { useState, useEffect } from "react";
import socket from '../../socketConfig';
import { useParams } from "react-router-dom";
const ChatArea = () => {
  const [messages, setMessages] = useState("");
  const id = useParams().id;
  socket.emit('joinRoom', id);
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
    });
    return () => socket.off('receive_message');
  }, [socket]);
  console.log(messages)
  return (
    <div>
      {/* {messages.message} */}
    </div>
  );
};

export default ChatArea;

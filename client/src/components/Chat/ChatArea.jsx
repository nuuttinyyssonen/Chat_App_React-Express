import { useState, useEffect } from "react";
import socket from '../../socketConfig';
import { useParams } from "react-router-dom";
import useGetChat from "../../hooks/useGetChat";
const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const id = useParams().id;
  const chat = useGetChat();

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
          <div className="messageContainer" key={key}>
            <p className="message">{message.message}</p>
          </div>
        )
      }
      return null;
    })
  }

  const chatHistory = () => {
    if (chat.chat && chat.chat.messages) {
      return chat.chat.messages.map((message, key) => (
        <div key={key}>
          <p>{message.message}</p>
        </div>
      ));
    }
    return null;
  };

  console.log(chatHistory());

  return (
    <div className="chatAreaContainer">
      {chatHistory()}
      {messages && messagesMap()}
    </div>
  );
};

export default ChatArea;

import { useState, useEffect } from "react";
import socket from '../../socketConfig';
import { useParams } from "react-router-dom";
import useGetChat from "../../hooks/useGetChat";
import useGetUserData from "../../hooks/useGetUserData";
const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const id = useParams().id;
  const chat = useGetChat();
  const user = useGetUserData();

  socket.emit('joinRoom', id);
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data])
    });
    return () => socket.off('receive_message');
  }, [socket]);

  const messagesMap = () => {
    return messages.map((message, key) => {
      if (message.room === id) {
        return (
          <div className="currentUserMsgs" key={key}>
            <p className="messageOther">{message.message}</p>
          </div>
        )
      }
      return null;
    })
  }

  const chatHistory = () => {
    if (chat.chat && chat.chat.messages && user.data) {
      return chat.chat.messages.map((message, key) => (
        <div className={message.user === user.data._id ? "currentUserMsgs" : "otherUserMsgs"} key={key}>
          <p className="messageCurrent">{message.message}</p>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="chatAreaContainer">
      {chatHistory()}
      {messages && messagesMap()}
    </div>
  );
};

export default ChatArea;

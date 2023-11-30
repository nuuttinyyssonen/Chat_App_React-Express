import { useRef, useEffect } from "react";
const ChatMessages = ({ messages, id, chat, user, typingText }) => {
  const chatContainerRef = useRef(null);

  const messagesMap = () => {
    return messages.map((message, key) => {
      if (message.room === id) {
        const messageDate = new Date();
        const messageMinutes = messageDate.getMinutes().length < 10 ? "0" + messageDate.getMinutes() : messageDate.getMinutes()
        return (
          <div key={key}>
            <div className={message.userId === user.data._id ? 'currentUserMsgs' : 'otherUserMsgs'}>
              <p className="messageOther">{message.message}</p>
            </div>
            <div className={message.userId === user.data._id ? 'currentUserMsgTime' : 'otherUserMsgTime'}>
              <p>{messageDate.getHours()}:{messageMinutes}</p>
            </div>
          </div>
        );
      }
      return null;
    });
  };

  const chatHistory = () => {
    if (chat.chat && chat.chat.messages && user.data) {
      return chat.chat.messages.map((message, key) => {
        const messageDate = new Date(message.date);
        const messageMinutes = messageDate.getMinutes() < 10 ? "0" + messageDate.getMinutes() : messageDate.getMinutes()
        return (
          <div key={key}>
            <div className={message.user === user.data._id ? 'currentUserMsgs' : 'otherUserMsgs'}>
              <p className="messageCurrent">{message.message}</p>
            </div>
            <div className={message.user === user.data._id ? 'currentUserMsgTime' : 'otherUserMsgTime'}>
              <p>{messageDate.getHours()}:{messageMinutes}</p>
            </div>
          </div>
        );
      });
    }
    return null;
  };

  useEffect(() => {
    if (messages.length > 0) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" });
    } else {
      chatContainerRef.current.scrollIntoView({ block: "end", inline: "nearest" });
    }
  }, [chatHistory, messagesMap]);

  return (
    <div ref={chatContainerRef} className="chatAreaContainer">
      {chatHistory()}
      {messages && messagesMap()}
    </div>
  );
};

export default ChatMessages;

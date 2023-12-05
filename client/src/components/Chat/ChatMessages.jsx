import { useRef, useEffect } from 'react';
import { SlTrash } from 'react-icons/sl';
const ChatMessages = ({ chat, user, handleDeleteMessage }) => {
  const chatContainerRef = useRef(null);

  const chatHistory = () => {
    if (chat.chat && chat.chat.messages && user.data) {
      return chat.chat.messages.map((message, key) => {
        const messageDate = new Date(message.date);
        const messageMinutes = messageDate.getMinutes() < 10 ? '0' + messageDate.getMinutes() : messageDate.getMinutes();
        if (message.chat === chat.chat._id) {
          return (
            message.user && <div key={key}>
              <div className={message.user._id === user.data._id ? 'currentUserMsgs' : 'otherUserMsgs'}>
                {chat.chat.users.length > 2 && message.user._id !== user.data._id && <p>{message.user.username}</p>}
                {message.user._id === user.data._id && <SlTrash id="deleteMessage" className="deleteMessage" onClick={() => handleDeleteMessage(chat.chat._id, message._id)} />}
                <p className="messageCurrent">{message.message}</p>
              </div>
              <div className={message.user._id === user.data._id ? 'currentUserMsgTime' : 'otherUserMsgTime'}>
                <p>{messageDate.getHours()}:{messageMinutes}</p>
              </div>
            </div>
          );
        } else {
          return null;
        }
      });
    }
    return null;
  };

  useEffect(() => {
    chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [chatHistory]);

  return (
    <div ref={chatContainerRef} className="chatAreaContainer">
      {chatHistory()}
    </div>
  );
};

export default ChatMessages;

const ChatMessages = ({ messages, id, chat, user }) => {
  const messagesMap = () => {
    return messages.map((message, key) => {
      if (message.room === id) {
        const messageDate = new Date();
        return (
          <div key={key}>
            <div className="currentUserMsgs">
              <p className="messageOther">{message.message}</p>
            </div>
            <div className='currentUserMsgTime'>
              <p>{messageDate.getHours()}:{messageDate.getMinutes()}</p>
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
        return (
          <div key={key}>
            <div className={message.user === user.data._id ? 'currentUserMsgs' : 'otherUserMsgs'}>
              <p className="messageCurrent">{message.message}</p>
            </div>
            <div className={message.user === user.data._id ? 'currentUserMsgTime' : 'otherUserMsgTime'}>
              <p>{messageDate.getHours()}:{messageDate.getMinutes()}</p>
            </div>
          </div>
        );
      });
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

export default ChatMessages;

const ChatMessages = ({ messages, id, chat, user }) => {
  const messagesMap = () => {
    return messages.map((message, key) => {
      if (message.room === id) {
        return (
          <div className="currentUserMsgs" key={key}>
            <p className="messageOther">{message.message}</p>
          </div>
        );
      }
      return null;
    });
  };

  const chatHistory = () => {
    if (chat.chat && chat.chat.messages && user.data) {
      return chat.chat.messages.map((message, key) => (
        <div className={message.user === user.data._id ? 'currentUserMsgs' : 'otherUserMsgs'} key={key}>
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

export default ChatMessages;

import ChatInput from './ChatInput';
import ChatArea from './ChatArea';
import ChatHeader from './ChatHeader';
const Chat = () => {
  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatArea />
      <ChatInput />
    </div>
  );
};

export default Chat;

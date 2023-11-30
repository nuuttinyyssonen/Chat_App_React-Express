import { SlPaperPlane } from 'react-icons/sl';
const ChatInput = ({ handleKeyDown, message, setMessage, sendMessage, typingText, user }) => {
  return (
    <div className="chatInput-container">
      {user.data && !typingText.includes(user.data.username) && <p className="typingText">{typingText}</p>}
      <input onKeyDown={handleKeyDown} id='chatInput' className="chatInput" placeholder="Write something..." value={message} onChange={(e) => setMessage(e.target.value)}/>
      <SlPaperPlane id='send' className="send-btn" onClick={sendMessage}/>
    </div>
  );
};

export default ChatInput;

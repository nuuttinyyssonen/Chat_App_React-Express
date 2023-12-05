import { SlPaperPlane } from 'react-icons/sl';
const ChatInput = ({ handleKeyDown, message, setMessage, sendMessage, typingText, user, id }) => {
  return (
    <div className="chatInput-container">
      {!typingText.text?.includes(user.data?.username) && id === typingText.room && <p className="typingText">{typingText.text}</p>}
      <input onKeyDown={handleKeyDown} id='chatInput' className="chatInput" placeholder="Write something..." value={message} onChange={(e) => setMessage(e.target.value)}/>
      <SlPaperPlane id='send' className="send-btn" onClick={sendMessage}/>
    </div>
  );
};

export default ChatInput;

import { SlPaperPlane } from 'react-icons/sl';
import { IoAdd } from 'react-icons/io5';
const ChatInput = ({
  handleKeyDown,
  typingText,
  user,
  message,
  setMessage,
  sendMessage,
  setSelectedImage,
  id
}) => {
  return (
    <div>
      {/* typing variable contains the username and the indicator is only displayed if username is not same as current user 's username */}
      {!typingText.text?.includes(user.data?.username) && id === typingText.room && <p className="typingText">{typingText.text}</p>}
      {/* all below are only renderd when inside of chat room. */}
      {id && <input
        onKeyDown={handleKeyDown}
        id='chatInput'
        className="chatInput"
        placeholder="Write something..."
        value={message} onChange={(e) => setMessage(e.target.value)}
      />}
      {id && <SlPaperPlane id='send' className="send-btn" onClick={sendMessage}/>}
      {id && <label htmlFor='fileInput' style={{ cursor: 'pointer' }}>
        <IoAdd className='send-btn'/>
      </label>}
      {id && <input
        type='file'
        id='fileInput'
        style={{ display: 'none' }}
        onChange={e => setSelectedImage(e.target.files[0])}
      />}
    </div>
  );
};

export default ChatInput;

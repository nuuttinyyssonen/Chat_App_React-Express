import { SlPaperPlane } from 'react-icons/sl';
import { IoAdd } from "react-icons/io5";
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
          {!typingText.text?.includes(user.data?.username) && id === typingText.room && <p className="typingText">{typingText.text}</p>}
          <input
            onKeyDown={handleKeyDown}
            id='chatInput'
            className="chatInput"
            placeholder="Write something..."
            value={message} onChange={(e) => setMessage(e.target.value)}
          />
          <SlPaperPlane id='send' className="send-btn" onClick={sendMessage}/>
          <label htmlFor='fileInput' style={{ cursor: 'pointer' }}>
            <IoAdd className='send-btn'/>
          </label>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={e => setSelectedImage(e.target.files[0])}
          />
        </div>
    );
};

export default ChatInput;

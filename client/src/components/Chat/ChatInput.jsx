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
  console.log(id)
  return (
    <div>
      {!typingText.text?.includes(user.data?.username) && id === typingText.room && <p className="typingText">{typingText.text}</p>}
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

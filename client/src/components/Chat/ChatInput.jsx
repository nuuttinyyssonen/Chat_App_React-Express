import { SlPaperPlane, SlTrash } from 'react-icons/sl';
import { IoAdd } from "react-icons/io5";
import { useState } from 'react';

const ChatInput = ({ handleKeyDown, message, setMessage, sendMessage, typingText, user, id }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="chatInput-container">
      {selectedImage && (
        <div className='imagePreview'>
          <div className='imagePreviewDetails'>
            <p>Selected Image:</p>
            <SlTrash onClick={() => setSelectedImage(null)} className='undoImage'/>
          </div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
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

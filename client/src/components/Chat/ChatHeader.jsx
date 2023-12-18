import { useParams } from 'react-router-dom';
import Profile from '../../style/images/Profile_picture.png';
import { useState, useRef, useEffect } from 'react';
import '../../style/main/animations.css';
import { MdSaveAlt } from 'react-icons/md';
import socket from '../../socketConfig';

const ChatHeader = ({ user, chat }) => {
  // Smooth transitions
  const mountedStyle = { animation: 'inAnimation 300ms ease-in' };
  const unmountedStyle = {
    animation: 'outAnimation 300ms ease-out',
    animationFillMode: 'forwards'
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const [chatNameInput, setChatNameInput] = useState('');

  const id = useParams().id;
  const editGroupNameRef = useRef(null);

  // Gets the user in private chat. Variable used in displaying user's name.
  const person = chat.chat?.users?.find(person => person.username !== user.data?.username);
  const isGrourpChat = chat.chat?.users?.length > 2;

  // Toggles between on/off edit mode in chat name.
  // When anything else other than chat name is clicked edit mode is turned off.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editGroupNameRef.current && !editGroupNameRef.current.contains(event.target)) {
        setIsEditMode(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editGroupNameRef]);

  const handleEditGroupName = () => {
    setIsEditMode(!isEditMode);
  };

  const saveHeaderName = async () => {
    socket.emit('groupName', { room: id, updatedName: chatNameInput });
    setIsEditMode(false);
  };

  return (
    <div style={user.data?.isDarkMode ? { backgroundColor: 'black', color: 'white', border: '1px solid black' } : { backgroundColor: 'white' }} className="ChatHeader">
      {!isGrourpChat && !person?.profileImage && <img src={Profile} className='ProfilepicHeader' style={{ width: '60px', height: '60px', borderRadius: '50%' }}/>}
      {!isGrourpChat && person?.profileImage && <img src={person?.profileImage} className='ProfilepicHeader' style={{ width: '60px', height: '60px', borderRadius: '50%' }}/>}
      {!isGrourpChat && <p id='headerFirstName' className='headerName'>{person?.username}</p>}
      {isGrourpChat && !isEditMode
        ? <p id='headerFirstName' className='headerName' style={!isEditMode ? mountedStyle : unmountedStyle} onClick={() => handleEditGroupName()}>{chat.chat?.chatName}</p>
        : isGrourpChat && <div ref={editGroupNameRef} style={isEditMode ? mountedStyle : unmountedStyle} className='editGroupName'>
          <input className='editChatNameInput' value={chatNameInput} onChange={e => setChatNameInput(e.target.value)} />
          <MdSaveAlt onClick={() => saveHeaderName()} className='saveHeader' />
        </div>}
    </div>
  );
};

export default ChatHeader;

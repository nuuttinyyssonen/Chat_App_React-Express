import { useParams } from 'react-router-dom';
import Profile from '../../style/images/Profile_picture.png';
import useGetChat from '../../hooks/useGetChat';
import { useState, useRef, useEffect } from 'react';
import '../../style/main/animations.css';
import { MdSaveAlt } from 'react-icons/md';
import chatService from '../../services/chatService';

const ChatHeader = ({ user }) => {
  const mountedStyle = { animation: 'inAnimation 300ms ease-in' };
  const unmountedStyle = {
    animation: 'outAnimation 300ms ease-out',
    animationFillMode: 'forwards'
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const [chatNameInput, setChatNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [chatName, setChatName] = useState('');

  const id = useParams().id;
  const chat = useGetChat(id);
  const editGroupNameRef = useRef(null);

  const person = chat.chat?.users.find(person => person.username !== user.data?.username);
  const isGrourpChat = chat.chat?.users.length > 2;

  useEffect(() => {
    setChatName(chat.chat?.chatName);
  }, [chat]);

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
    try {
      const updatedName = { groupChatName: chatNameInput };
      const data = await chatService.updateChatName(id, updatedName);
      chat.setName(data.chatName);
      setIsEditMode(false);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, [5000]);
      }
    }
  };

  return (
    <div className="ChatHeader">
      {!isGrourpChat && !person?.profileImage && <img src={Profile} className='ProfilepicHeader'/>}
      {!isGrourpChat && person?.profileImage && <img src={person?.profileImage} className='ProfilepicHeader' style={{ width: '60px', height: '60px', borderRadius: '50%' }}/>}
      {!isGrourpChat && <p id='headerFirstName' className='headerName'>{person?.username}</p>}
      {isGrourpChat && !isEditMode
        ? <p id='headerFirstName' className='headerName' style={!isEditMode ? mountedStyle : unmountedStyle} onClick={() => handleEditGroupName()}>{chatName}</p>
        : isGrourpChat && <div ref={editGroupNameRef} style={isEditMode ? mountedStyle : unmountedStyle} className='editGroupName'>
          <input className='editChatNameInput' value={chatNameInput} onChange={e => setChatNameInput(e.target.value)} />
          <MdSaveAlt onClick={() => saveHeaderName()} className='saveHeader' />
          {errorMessage && <p className='errorMsg headerError'>{errorMessage}</p>}
        </div>}
    </div>
  );
};

export default ChatHeader;

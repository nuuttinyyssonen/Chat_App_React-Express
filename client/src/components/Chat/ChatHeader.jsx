import { useParams } from 'react-router-dom';
import Profile from '../../style/images/Profile_picture.png';
import useGetChat from '../../hooks/useGetChat';
import { useState, useRef, useEffect } from 'react';
import '../../style/main/animations.css';

const ChatHeader = ({ user }) => {
  const mountedStyle = { animation: "inAnimation 300ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 300ms ease-out",
    animationFillMode: "forwards"
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const id = useParams().id;
  const chat = useGetChat(id);
  const person = chat.chat?.users.find(person => person.username !== user.data?.username)
  const isGrourpChat = chat.chat?.users.length > 2;

  const handleEditGroupName = () => {
    setIsEditMode(!isEditMode);
  };

  const undoEditGroupName = () => {
    setIsEditMode(false);
  }

  return (
    <div className="ChatHeader">
      <img src={Profile} className='ProfilepicHeader'/>
      {!isGrourpChat && <p id='headerFirstName' className='headerName'>{person?.username}</p>}
      {isGrourpChat && !isEditMode
        ? <p id='headerFirstName' className='headerName' style={!isEditMode ? mountedStyle : unmountedStyle} onClick={() => handleEditGroupName()}>{chat.chat?.chatName}</p>
        : isGrourpChat && <div style={isEditMode ? mountedStyle : unmountedStyle} className='editGroupName'> <input autoFocus/> <button onClick={() => undoEditGroupName()}>x</button> </div>}
    </div>
  );
};

export default ChatHeader;

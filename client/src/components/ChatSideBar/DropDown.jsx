import { SlPencil, SlUser, SlPeople, SlClose } from 'react-icons/sl';
import { IoMdArrowBack } from 'react-icons/io';

const DropDown = ({
  dropDown,
  handleNewChat,
  handleNewGroupChat,
  mountedStyle,
  unmountedStyle,
  undoCreatePrivateChat,
  newGroupChat,
  newChat,
  handleDropDown
}) => {
  return (
    <div className='newChat'>
      <div className={`newChatItems ${dropDown ? 'visible' : ''}`}>
        <p className='newChatItem' onClick={() => handleNewChat()}><SlUser /> New Private Chat</p>
        <p className='newChatItem' onClick={() => handleNewGroupChat()}><SlPeople /> New Group Chat</p>
      </div>
      {dropDown
        ? <SlClose style={dropDown ? mountedStyle : unmountedStyle} onClick={() => handleDropDown()} className='edit'/>
        : newChat || newGroupChat
          ? <IoMdArrowBack style={(!dropDown && newGroupChat) || (!dropDown && newChat) ? mountedStyle : unmountedStyle} onClick={() => undoCreatePrivateChat()} className='edit' />
          : <SlPencil style={!dropDown ? mountedStyle : unmountedStyle} onClick={() => handleDropDown()} className='edit' />}
    </div>
  );
};

export default DropDown;

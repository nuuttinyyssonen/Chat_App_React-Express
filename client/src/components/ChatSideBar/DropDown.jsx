import { SlPencil, SlUser, SlPeople, SlClose } from 'react-icons/sl';
import { IoMdArrowBack } from 'react-icons/io';

const DropDown = ({
  dropDown,
  handleNewChat,
  handleNewGroupChat,
  animationStyle,
  undoCreatePrivateChat,
  newGroupChat,
  newChat,
  handleDropDown
}) => {
  return (
    <div className='newChat'>
      {/* Dropdown items for creating new chats */}
      <div className={`newChatItems ${dropDown ? 'visible' : ''}`}>
        <p className='newChatItem' id='createPrivateChatButton' onClick={() => handleNewChat()}><SlUser /> New Private Chat</p>
        <p className='newChatItem' id='createGroupChatButton' onClick={() => handleNewGroupChat()}><SlPeople /> New Group Chat</p>
      </div>
      {/* Icons for closing the dropdown, navigating back, or opening the dropdown */}
      {dropDown
        ? <SlClose style={animationStyle} onClick={() => handleDropDown()} className='edit'/>
        : newChat || newGroupChat
          ? <IoMdArrowBack id='backToContactList' style={animationStyle} onClick={() => undoCreatePrivateChat()} className='edit' />
          : <SlPencil id='openDropDown' style={animationStyle} onClick={() => handleDropDown()} className='edit' />}
    </div>
  );
};

export default DropDown;

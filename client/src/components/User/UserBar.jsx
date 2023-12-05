import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SearchedUsers from './SearchedUsers';
import FriendsList from './FriendsList';
import useGetUsers from '../../hooks/useGetUsers';
import { IoMdArrowBack } from "react-icons/io";
import useGetUserData from '../../hooks/useGetUserData';
import { SlPencil, SlUser, SlPeople, SlClose } from "react-icons/sl";
import socket from '../../socketConfig';
import CreateGroupChat from '../CreateGroupChat/CreateGroupChat';
import '../../style/main/animations.css';

const UserBar = () => {
  const mountedStyle = { animation: "inAnimation 250ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 250ms ease-out",
    animationFillMode: "forwards"
  };

  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const users = useGetUsers(search);
  const data = useGetUserData();
  const inputRef = useRef(null);

  const [newChat, setNewChat] = useState(false);
  const [newGroupChat, setNewGroupChat] = useState(false);

  const handleLogout = (id) => {
    localStorage.clear();
    navigate('/');
    socket.emit('logout', id)
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  }

  const handleNewChat = () => {
    setNewChat(!newChat);
    setNewGroupChat(false);
    handleDropDown();
  }

  const handleNewGroupChat = () => {
    setNewGroupChat(!newGroupChat);
    setNewChat(false);
    handleDropDown();
  }

  const undoCreatePrivateChat = () => {
    setNewChat(false);
    setNewGroupChat(false);
    setDropDown(false);
  }

  useEffect(() => {
    if (newChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newChat]);

  const displayGroupChat = newGroupChat && users;
  const displayFriendList = data.data && !newChat && !newGroupChat;

  return (
    <div className="left-side">
      {newChat && <input ref={inputRef} className="search-input" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}/>}
      <div className='navbar-container' style={!newGroupChat && !newChat ? mountedStyle : unmountedStyle}>
      {!search && !newChat && !newGroupChat && <Navbar
        user={data}
        handleLogout={handleLogout}
        search={search}
        setSearch={setSearch}
      />}
       </div>
       {displayGroupChat && <div style={newGroupChat ? mountedStyle : unmountedStyle}>
        <CreateGroupChat
          users={users}
        />
      </div>}
      {users && newChat && <div style={newChat ? mountedStyle : unmountedStyle}>
        <SearchedUsers
          users={users}
        />
      </div>}
      <div>
      {displayFriendList &&
        <FriendsList chats={data.data.chats} data={data}/>}
      </div>
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
    </div>
  );
};

export default UserBar;

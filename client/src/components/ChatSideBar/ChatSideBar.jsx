import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';
import useGetUserData from '../../hooks/useGetUserData';
import socket from '../../socketConfig';
import '../../style/main/animations.css';
import ChatSideBarContainer from './ChatSideBarContainer';

const ChatSideBar = () => {
  const mountedStyle = { animation: 'inAnimation 250ms ease-in' };
  const unmountedStyle = {
    animation: 'outAnimation 250ms ease-out',
    animationFillMode: 'forwards'
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
    socket.emit('logout', id);
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleNewChat = () => {
    setNewChat(!newChat);
    setNewGroupChat(false);
    handleDropDown();
  };

  const handleNewGroupChat = () => {
    setNewGroupChat(!newGroupChat);
    setNewChat(false);
    handleDropDown();
  };

  const undoCreatePrivateChat = () => {
    setNewChat(false);
    setNewGroupChat(false);
    setDropDown(false);
  };

  useEffect(() => {
    if (newChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newChat]);

  const displayGroupChat = newGroupChat && users;
  const displayNewChat = users && newChat;
  const displayFriendList = data.data && !newChat && !newGroupChat;
  const displayNavbar = !search && !newChat && !newGroupChat;

  return (
    <ChatSideBarContainer
      displayGroupChat={displayGroupChat}
      displayNewChat={displayNewChat}
      displayFriendList={displayFriendList}
      displayNavbar={displayNavbar}
      newChat={newChat}
      newGroupChat={newGroupChat}
      dropDown={dropDown}
      handleLogout={handleLogout}
      search={search}
      setSearch={setSearch}
      users={users}
      data={data}
      inputRef={inputRef}
      mountedStyle={mountedStyle}
      unmountedStyle={unmountedStyle}
      handleNewChat={handleNewChat}
      handleNewGroupChat={handleNewGroupChat}
      handleDropDown={handleDropDown}
      undoCreatePrivateChat={undoCreatePrivateChat}
    />
  );
};

export default ChatSideBar;

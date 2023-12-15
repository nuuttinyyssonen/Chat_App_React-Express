import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';
import useGetUserData from '../../hooks/useGetUserData';
import socket from '../../socketConfig';
import '../../style/main/animations.css';
import ChatSideBarContainer from './ChatSideBarContainer';
import useMountAnimation from '../../hooks/useMountAnimation';

const ChatSideBar = () => {
  // Custom hook for animations
  const animationStyle = useMountAnimation();

  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Custom hooks for user data
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

  // Toggle functions for rendering dropdown and chat creation.
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

  // Effect for auto-focusing the input field in new chat mode.
  useEffect(() => {
    if (newChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newChat]);

  // Conditions for displaying various components.
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
      animationStyle={animationStyle}
      handleNewChat={handleNewChat}
      handleNewGroupChat={handleNewGroupChat}
      handleDropDown={handleDropDown}
      undoCreatePrivateChat={undoCreatePrivateChat}
    />
  );
};

export default ChatSideBar;

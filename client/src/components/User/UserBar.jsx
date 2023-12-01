import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SearchedUsers from './SearchedUsers';
import FriendsList from './FriendsList';
import useGetUsers from '../../hooks/useGetUsers';
import { useSpring, animated } from 'react-spring';
import useGetUserData from '../../hooks/useGetUserData';
import { SlPencil, SlUser, SlPeople, SlClose } from "react-icons/sl";
import socket from '../../socketConfig';

const UserBar = () => {
  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const users = useGetUsers(search);
  const data = useGetUserData();
  const inputRef = useRef(null);

  const [newChat, setNewChat] = useState(false);
  const [newGroupChat, setNewGroupChat] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    socket.emit('logout', data.data._id)
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  }

  const handleNewChat = () => {
    setNewChat(!newChat);
    setDropDown(!dropDown);
  }

  useEffect(() => {
    if (newChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newChat]);

  const animationProps = useSpring({
    opacity: newChat ? 0 : 1,
    transform: newChat ? 'translateY(-100%)' : 'translateY(0%)'
  });

  return (
    <div className="left-side">
      {newChat && <input ref={inputRef} className="search-input" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}/>}
      <animated.div className='navbar-container' style={animationProps}>
      {!search && !newChat && <Navbar
        user={data}
        handleLogout={handleLogout}
        search={search}
        setSearch={setSearch}
      />}
       </animated.div>
      {users && newChat
        ? <SearchedUsers
          users={users}
        />
        : null}
      <animated.div style={animationProps}>
      {data.data && !search && !newChat
        ? <FriendsList friends={data.data.friends} chats={data.data.chats}/>
        : null}
      </animated.div>
        <div className='newChat'>
          <div className={`newChatItems ${dropDown ? 'visible' : ''}`}>
            <p className='newChatItem' onClick={() => handleNewChat()}><SlUser /> New Private Chat</p>
            <p className='newChatItem'><SlPeople /> New Group Chat</p>
          </div>
          <SlPencil onClick={() => handleDropDown()} className='edit' />
        </div>
    </div>
  );
};

export default UserBar;

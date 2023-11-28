import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SearchedUsers from './SearchedUsers';
import FriendsList from './FriendsList';
import useGetUsers from '../../hooks/useGetUsers';
import useGetUserData from '../../hooks/useGetUserData';

const UserBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const users = useGetUsers(search);
  const data = useGetUserData();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="left-side">
      <Navbar
        user={data}
        handleLogout={handleLogout}
        search={search}
        setSearch={setSearch}
      />
      {users
        ? <SearchedUsers
          users={users}
        />
        : null}
      {data.data
        ? <FriendsList friends={data.data.friends} chats={data.data.chats}/>
        : null}
    </div>
  );
};

export default UserBar;

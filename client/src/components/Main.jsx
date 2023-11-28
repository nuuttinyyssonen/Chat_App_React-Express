import UserBar from './User/UserBar';
import '../style/main/main.css';
import '../style/main/chat.css';
import '../style/main/friends.css';
import '../style/main/navbar.css';
import '../style/main/searchedUsers.css';
import Chat from './Chat/Chat';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Main = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);
  return (
    <div className="Main-container">
      <UserBar />
      <Chat />
    </div>
  );
};

export default Main;

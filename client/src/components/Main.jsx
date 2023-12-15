import ChatSideBar from './ChatSideBar/ChatSideBar';
import '../style/main/main.css';
import '../style/main/chat.css';
import '../style/main/friends.css';
import '../style/main/navbar.css';
import '../style/main/searchedUsers.css';
import Chat from './Chat/Chat';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import tokenService from '../services/tokenService';

const Main = () => {
  const token = tokenService.getToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);
  return (
    <div className="Main-container">
      <ChatSideBar />
      <Chat />
    </div>
  );
};

export default Main;

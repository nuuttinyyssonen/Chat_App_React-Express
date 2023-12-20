import ChatSideBar from './ChatSideBar/ChatSideBar';
import '../style/main/main.css';
import '../style/main/chat.css';
import '../style/main/friends.css';
import '../style/main/navbar.css';
import '../style/main/searchedUsers.css';
import Chat from './Chat/Chat';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import tokenService from '../services/tokenService';

const Main = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [showContactList, setShowContactList] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // If token is not in localStorage user is navigated to log in page.
  const token = tokenService.getToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);
  return (
    <div className="Main-container">
      <ChatSideBar isMobile={isMobile} showContactList={showContactList} setShowContactList={setShowContactList}/>
      <Chat isMobile={isMobile} showContactList={showContactList} setShowContactList={setShowContactList}/>
    </div>
  );
};

export default Main;

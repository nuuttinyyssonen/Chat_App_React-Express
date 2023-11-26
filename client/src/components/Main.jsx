import UserBar from './User/UserBar';
import '../style/main/main.css';
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

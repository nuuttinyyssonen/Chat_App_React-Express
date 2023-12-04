import { useLocation } from 'react-router-dom';
import Profile from '../../style/images/Profile_picture.png';
import { useSelector } from 'react-redux';
import { GoDotFill } from "react-icons/go";
import { initalizeUsers } from '../../reducers/onlineUserReducer';

const ChatHeader = () => {
  const location = useLocation();
  const onlineUsers = useSelector(({ onlineUsers }) => {
    return onlineUsers;
  })
  const isOnline = location.state && onlineUsers.includes(location.state.friendId);
  return (
    <div className="ChatHeader">
      <GoDotFill className={isOnline ? 'onlineStatusHeader' : 'offlineStatusHeader'}/>
      <img src={Profile} className='ProfilepicHeader'/>
      {location.state && <p id='headerFirstName' className='headerName'>{location.state.firstName} {location.state.lastName}</p>}
    </div>
  );
};

export default ChatHeader;

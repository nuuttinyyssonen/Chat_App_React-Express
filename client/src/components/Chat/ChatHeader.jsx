import { useLocation } from 'react-router-dom';
import Profile from '../../style/images/Profile_picture.png';
const ChatHeader = () => {
  const location = useLocation();
  return (
    location.state && <div className="ChatHeader">
      {location.state && <img src={Profile} className='ProfilepicHeader'/>}
      {location.state && <p id='headerFirstName' className='headerName'>{location.state.firstName} {location.state.lastName}</p>}
    </div>
  );
};

export default ChatHeader;

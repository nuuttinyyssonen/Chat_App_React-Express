import profilePic from '../../style/images/Profile_picture.png';
import { GoDotFill } from 'react-icons/go';
const Contact = ({ userIndex, chat, isOnline, message, urlId }) => {
  return (
    <div className={ urlId === chat._id ? 'friendsList SelectedChat' : 'friendsList' }>
      {/* Online/offline status icon and profile image are displayed if chat is private chat */}
      {userIndex !== -1 && <GoDotFill className={isOnline[userIndex] ? 'onlineStatus' : 'offlineStatus'}/>}
      {!chat.users[userIndex]?.profileImage && <img className="profilePicInUserList" src={profilePic} style={{ width: '60px' }} />}
      {chat.users[userIndex]?.profileImage && <img className="profilePicInUserList" src={chat.users[userIndex]?.profileImage} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />}

      {/* Contact details display */}
      <div className='friendDetails'>
        {userIndex !== -1 && (
          <div className='friendName'>
            <p>{chat.users[userIndex].username}</p>
          </div>
        )}
        {userIndex === -1 && (
          <div>
            <p>{chat.chatName}</p>
          </div>
        )}
        <p className='latestMessage'>{message}</p>
      </div>
    </div>
  );
};

export default Contact;

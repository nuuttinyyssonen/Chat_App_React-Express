import { useParams } from 'react-router-dom';
import Profile from '../../style/images/Profile_picture.png';
import useGetChat from '../../hooks/useGetChat';

const ChatHeader = ({ user }) => {
  const id = useParams().id;
  const chat = useGetChat(id);
  const person = chat.chat?.users.find(person => person.username !== user.data?.username)
  const isGrourpChat = chat.chat?.users.length > 2;
  return (
    <div className="ChatHeader">
      <img src={Profile} className='ProfilepicHeader'/>
      {!isGrourpChat && <p id='headerFirstName' className='headerName'>{person?.username}</p>}
      {isGrourpChat && <p id='headerFirstName' className='headerName'>Group Chat</p>}
    </div>
  );
};

export default ChatHeader;

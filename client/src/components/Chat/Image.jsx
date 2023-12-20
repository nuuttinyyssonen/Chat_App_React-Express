import { SlTrash } from 'react-icons/sl';
const Image = ({ item, user, handleDeleteImage, chat, itemDate, itemMinutes }) => {
  return (
    <div>
      <div className={item.user._id === user.data._id ? 'currentUserMsgs image' : 'otherUserMsgs image'}>
        {chat.chat.users.length > 2 && item.user?._id !== user.data?._id && <p>{item.user.username}</p>}
        {item.user._id === user.data._id && <SlTrash id="deleteMessage" className="deleteMessage image" onClick={() => handleDeleteImage(chat.chat._id, item._id)} />}
        <img src={item.dataUrl} style={{ width: '300px' }} alt="User Uploaded" />
      </div>
      <div className={item.user._id === user.data._id ? 'currentUserMsgTime' : 'otherUserMsgTime'}>
        <p>{itemDate.getHours()}:{itemMinutes}</p>
      </div>
    </div>
  );
};

export default Image;

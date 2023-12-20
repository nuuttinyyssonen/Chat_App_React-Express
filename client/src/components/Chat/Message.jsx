import { SlTrash } from 'react-icons/sl';
const Message = ({ item, user, dateToDisplay, displayTimeline, chat, handleDeleteMessage, itemDate, itemMinutes }) => {
  return (
    <div>
      {displayTimeline && <div className="timeline">
        <span style={user.data.isDarkMode ? { color: 'white' } : { color: 'black' } } className="day-label">{dateToDisplay}</span>
      </div>}
      {/* 2 different classNames makes own messages right aligned and others left aligned. */}
      <div className={item.user._id === user.data._id ? 'currentUserMsgs' : 'otherUserMsgs'}>
        {/* User's name is displayed if chat has more than 2 users meaning that it's a group chat. */}
        {chat.chat.users.length > 2 && item.user._id !== user.data._id && <p>{item.user.username}</p>}
        {/* Delete icon can be only seend if message's user id and current user id are the same */}
        {item.user._id === user.data._id && <SlTrash id="deleteMessage" className="deleteMessage" onClick={() => handleDeleteMessage(chat.chat._id, item._id)} />}
        {item.chat === chat.chat._id && <p className="messageCurrent">{item.message}</p>}
      </div>
      {/* Time stamps */}
      <div className={item.user._id === user.data._id ? 'currentUserMsgTime' : 'otherUserMsgTime'}>
        <p style={user.data.isDarkMode ? { color: 'white' } : { color: 'black' } } >{itemDate.getHours()}:{itemMinutes}</p>
      </div>
    </div>
  );
};

export default Message;

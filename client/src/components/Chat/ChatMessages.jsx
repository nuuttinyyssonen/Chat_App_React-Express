import { useRef, useEffect } from 'react';
import { SlTrash } from 'react-icons/sl';
import useMountAnimation from '../../hooks/useMountAnimation';
import formatDate from '../../services/formatDate';
const ChatMessages = ({ chat, user, handleDeleteMessage, handleDeleteImage, errorMessage }) => {
  const chatContainerRef = useRef(null);
  const animationStyle = useMountAnimation();
  const chatHistory = () => {
    if (chat.chat && chat.chat.messages && chat.chat.images && user.data) {
      // Sorting every message or image in chat by date.
      const allItems = [...chat.chat.messages, ...chat.chat.images];
      const sortedItems = allItems.sort((a, b) => new Date(a.date) - new Date(b.date));

      return sortedItems.map((item, key) => {
        const itemDate = new Date(item.date);
        const itemMinutes = itemDate.getMinutes() < 10 ? '0' + itemDate.getMinutes() : itemDate.getMinutes();

        // Displaying timeline (day.month.year) when day is different between messages.
        let displayTimeline = false;
        const day = new Date(item.date);
        const dateToDisplay = formatDate(day);

        if (key > 0) {
          const previousItemDate = new Date(sortedItems[key - 1].date);
          displayTimeline = day.getDate() !== previousItemDate.getDate();
        }
        // This returns messages
        if (item.message) {
          return (
            item.user && item.chat === chat.chat?._id && <div style={animationStyle} key={key}>
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
        // This returns images.
        } else if (item.dataUrl) {
          return (
            <div style={animationStyle} key={key}>
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
        }
        return null;
      });
    }
    return null;
  };

  // Always when chat is opened, the view starts from the bottom of messages and images.
  useEffect(() => {
    chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [chatHistory]);

  return (
    <div ref={chatContainerRef} className="chatAreaContainer">
      {chatHistory()}
      {errorMessage && <p className='errorMsg'>{errorMessage}</p>}
    </div>
  );
};

export default ChatMessages;

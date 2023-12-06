import { useRef, useEffect } from 'react';
import { SlTrash } from 'react-icons/sl';
const ChatMessages = ({ chat, user, handleDeleteMessage, handleDeleteImage }) => {
  const chatContainerRef = useRef(null);

  const chatHistory = () => {
    if (chat.chat && chat.chat.messages && chat.chat.images && user.data) {
      const allItems = [...chat.chat.messages, ...chat.chat.images]
      const sortedItems = allItems.sort((a, b) => new Date(a.date) - new Date(b.date));

      return sortedItems.map((item, key) => {
        const itemDate = new Date(item.date);
        const itemMinutes = itemDate.getMinutes() < 10 ? '0' + itemDate.getMinutes() : itemDate.getMinutes();
        if (item.message) {
          return (
            item.user && <div key={key}>
              <div className={item.user._id === user.data._id ? 'currentUserMsgs' : 'otherUserMsgs'}>
                {chat.chat.users.length > 2 && item.user._id !== user.data._id && <p>{item.user.username}</p>}
                {item.user._id === user.data._id && <SlTrash id="deleteMessage" className="deleteMessage" onClick={() => handleDeleteMessage(chat.chat._id, item._id)} />}
                <p className="messageCurrent">{item.message}</p>
              </div>
              <div className={item.user._id === user.data._id ? 'currentUserMsgTime' : 'otherUserMsgTime'}>
                <p>{itemDate.getHours()}:{itemMinutes}</p>
              </div>
            </div>
          );
        } else if (item.dataUrl) {
          return (
          <div key={key}>
            <div className={item.user._id === user.data._id ? 'currentUserMsgs image' : 'otherUserMsgs image'}>
                {chat.chat.users.length > 2 && item.user._id !== user.data._id && <p>{item.user.username}</p>}
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
    })
  }
    return null;
  };

  useEffect(() => {
    chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [chatHistory]);

  return (
    <div ref={chatContainerRef} className="chatAreaContainer">
      {chatHistory()}
    </div>
  );
};

export default ChatMessages;

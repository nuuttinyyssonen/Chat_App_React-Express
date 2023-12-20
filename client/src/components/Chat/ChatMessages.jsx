import { useRef, useEffect } from 'react';
import useMountAnimation from '../../hooks/useMountAnimation';
import formatDate from '../../services/formatDate';
import Message from './Message';
import Image from './Image';
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
              <Message
                item={item}
                user={user}
                dateToDisplay={dateToDisplay}
                displayTimeline={displayTimeline}
                chat={chat}
                handleDeleteMessage={handleDeleteMessage}
                itemDate={itemDate}
                itemMinutes={itemMinutes}
              />
            </div>
          );
        // This returns images.
        } else if (item.dataUrl) {
          return (
            <div key={key} style={animationStyle}>
              <Image
                item={item}
                user={user}
                handleDeleteImage={handleDeleteImage}
                chat={chat}
                itemDate={itemDate}
                itemMinutes={itemMinutes}
              />
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

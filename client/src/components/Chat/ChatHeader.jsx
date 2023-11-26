import { useLocation } from 'react-router-dom';
const ChatHeader = () => {
  const location = useLocation();
  return (
    <div className="ChatHeader">
      {location.state && <p>{location.state.firstName} {location.state.lastName}</p>}
    </div>
  );
};

export default ChatHeader;

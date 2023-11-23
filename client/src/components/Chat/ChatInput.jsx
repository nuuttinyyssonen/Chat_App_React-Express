import { SlPaperPlane } from "react-icons/sl";
const ChatInput = () => {
    return (
        <div className="chatInput-container">
            <input className="chatInput" placeholder="Write something..."/>
            <SlPaperPlane className="send-btn"/>
        </div>
    );
};

export default ChatInput;

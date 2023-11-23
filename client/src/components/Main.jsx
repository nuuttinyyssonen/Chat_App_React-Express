import UserBar from './User/UserBar';
import '../style/main/main.css';
import Chat from "./Chat/Chat";
const Main = () => {
    return (
        <div className="Main-container">
            <UserBar />
            <Chat />
        </div>
    );
};

export default Main;

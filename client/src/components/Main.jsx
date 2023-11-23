import Leftside from "./Leftside";
import '../style/main/main.css';
import Chat from "./Chat/Chat";
const Main = () => {
    return (
        <div className="Main-container">
            <Leftside />
            <Chat />
        </div>
    );
};

export default Main;

import { useState } from "react";
import profilePic from '../../style/images/Profile_picture.png';
import useGetUsers from "../../hooks/useGetUsers";
import chatService from "../../services/chatService";
const CreateGroupChat = () => {
    const [group, setGroup] = useState([]);
    const [username, setUsername] = useState("");
    const users = useGetUsers(username);

    const addToGroup = (user) => {
        if (group.includes(user)) {
            return;
        }
        setGroup(prev => [...prev, user]);
    };

    const removeFromGroup = (user) => {
        setGroup(group.filter(person => person !== user));
    };

    const createGroup = async () => {
        if (group.length <= 2) {
            return;
        }
        try {
            const data = await chatService.createGroupChat(group);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <input placeholder="search for users..." value={username} onChange={e => setUsername(e.target.value)}/>
            {users.users && users.users.map((user, key) => (
                <div className="userInList" key={key} onClick={() => addToGroup(user)}>
                    <img className="profilePicInUserList" src={profilePic} alt={`Profile for ${user}`} />
                    <h2 className="usernameInList">{user}</h2>
                </div>
            ))}
            {group.map((user, key) => (
                <div className="userInList" key={key}>
                    <img className="profilePicInUserList" src={profilePic} alt={`Profile for ${user}`} />
                    <h2 className="usernameInList">{user}</h2>
                    <button onClick={() => removeFromGroup(user)}>Remove</button>
                </div>
            ))}
            <button onClick={() => createGroup()}>Create</button>
        </div>
    );
};

export default CreateGroupChat;

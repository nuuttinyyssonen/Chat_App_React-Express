import { useState } from "react";
import profilePic from '../../style/images/Profile_picture.png';
import useGetUsers from "../../hooks/useGetUsers";
import chatService from "../../services/chatService";
import CreateGroupChatMap from "./CreateGroupChatMap";
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
        <CreateGroupChatMap
            username={username}
            setUsername={setUsername}
            users={users}
            addToGroup={addToGroup}
            removeFromGroup={removeFromGroup}
            createGroup={createGroup}
            group={group}
            profilePic={profilePic}
        />
    );
};

export default CreateGroupChat;

import { useState } from 'react';
import profilePic from '../../style/images/Profile_picture.png';
import useGetUsers from '../../hooks/useGetUsers';
import chatService from '../../services/chatService';
import CreateGroupChatMap from './CreateGroupChatMap';
const CreateGroupChat = () => {
  const [group, setGroup] = useState([]);
  const [username, setUsername] = useState('');
  const users = useGetUsers(username);
  const [errorMessage, setErrorMessage] = useState('');

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
    try {
      const data = await chatService.createGroupChat(group);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, [5000]);
      }
    }
  };

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
      errorMessage={errorMessage}
    />
  );
};

export default CreateGroupChat;

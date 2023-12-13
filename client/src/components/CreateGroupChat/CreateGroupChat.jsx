import { useState } from 'react';
import profilePic from '../../style/images/Profile_picture.png';
import useGetUsers from '../../hooks/useGetUsers';
import CreateGroupChatMap from './CreateGroupChatMap';
import useCreateGroup from '../../hooks/useCreateGroup';
const CreateGroupChat = () => {
  const [group, setGroup] = useState([]);
  const [username, setUsername] = useState('');
  const users = useGetUsers(username);
  const [createGroup, errorMessage] = useCreateGroup();

  const addToGroup = (user) => {
    if (group.includes(user)) {
      return;
    }
    setGroup(prev => [...prev, user]);
  };

  const removeFromGroup = (user) => {
    setGroup(group.filter(person => person !== user));
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

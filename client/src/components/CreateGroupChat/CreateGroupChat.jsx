import { useState } from 'react';
import profilePic from '../../style/images/Profile_picture.png';
import useGetUsers from '../../hooks/useGetUsers';
import CreateGroupChatMap from './CreateGroupChatMap';
import useCreateGroup from '../../hooks/useCreateGroup';
const CreateGroupChat = ({ data }) => {
  const [group, setGroup] = useState([]);
  const [username, setUsername] = useState('');
  const users = useGetUsers(username);
  const [createGroup, errorMessage, successMessage] = useCreateGroup();

  const addToGroup = (user) => {
    if (group.includes(user)) {
      return;
    }
    setGroup(prev => [...prev, user]);
  };

  const removeFromGroup = (user) => {
    setGroup(group.filter(person => person !== user));
  };
  console.log("before", data)
  const handleCreateGroup = async () => {
    const response = await createGroup(group);
    console.log(response)
    data.setData(response);
    console.log("after", data)
    setGroup([]);
  };

  return (
    <CreateGroupChatMap
      username={username}
      setUsername={setUsername}
      users={users}
      addToGroup={addToGroup}
      removeFromGroup={removeFromGroup}
      createGroup={handleCreateGroup}
      group={group}
      profilePic={profilePic}
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
};

export default CreateGroupChat;

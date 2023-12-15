import { SlTrash } from 'react-icons/sl';
const CreateGroupChatMap = ({ username, setUsername, users, addToGroup, removeFromGroup, createGroup, group, profilePic, errorMessage, successMessage }) => {
  return (
    <div>
      <input className="search-input" placeholder="search for users..." value={username} onChange={e => setUsername(e.target.value)}/>
      {/* This renders queried users based on input value */}
      {users.users && users.users.map((user, key) => (
        <div className="userInList" key={key} onClick={() => addToGroup(user)}>
          <img className="profilePicInUserList" src={profilePic} alt={`Profile for ${user}`} />
          <h2 className="usernameInList">{user}</h2>
        </div>
      ))}
      {/* This renders group's state */}
      {group.map((user, key) => (
        <div className="userInList" key={key}>
          <img className="profilePicInUserList" src={profilePic} alt={`Profile for ${user}`} />
          <h2 className="usernameInList">{user}</h2>
          <SlTrash onClick={() => removeFromGroup(user)}/>
        </div>
      ))}
      <button className='createGroupBtn' onClick={() => createGroup()}>Create</button>
      <p className="errorMsg">{errorMessage}</p>
      <p className="successMsg">{successMessage}</p>
    </div>
  );
};

export default CreateGroupChatMap;

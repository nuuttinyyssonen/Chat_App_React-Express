const CreateGroupChatMap = ({ username, setUsername, users, addToGroup, removeFromGroup, createGroup, group, profilePic, errorMessage }) => {
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
      <button onClick={() => createGroup(group)}>Create</button>
      <p className="errorMsg">{errorMessage}</p>
    </div>
  );
};

export default CreateGroupChatMap;

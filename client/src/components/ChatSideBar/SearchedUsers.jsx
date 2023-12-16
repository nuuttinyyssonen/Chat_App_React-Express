import profilePic from '../../style/images/Profile_picture.png';
import { useNavigate } from 'react-router-dom';

const UsersList = ({ users }) => {
  const navigate = useNavigate();

  const viewProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    users.users
      ? (
        <div className="usersList">
          {/* Maps all users that were queried based on username */}
          {users.users.map((user, key) => (
            <div id='privateContactContainer' className="userInList" onClick={() => viewProfile(user)} key={key}>
              <img className="profilePicInUserList" src={profilePic} alt={`Profile for ${user}`} />
              <h2 className="usernameInList">{user}</h2>
            </div>
          ))}
        </div>
      )
      : null
  );
};

export default UsersList;

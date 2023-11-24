import profilePic from '../../style/images/Profile_picture.png';
import { useNavigate } from 'react-router-dom';

const UsersList = ({ users }) => {
    const navigate = useNavigate();

    const viewProfile = (username) => {
        navigate(`/users/${username}`);
    };

    return (
        users.users
        ? (
          <div className="usersList">
            {users.users.map((user, key) => (
              <div className="userInList" onClick={() => viewProfile(user)} key={key}>
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

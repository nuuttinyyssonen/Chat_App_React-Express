import profilePic from '../../style/images/Profile_picture.png';
import { useNavigate } from 'react-router-dom';

const UsersList = ({ users }) => {
    const navigate = useNavigate();

    const viewProfile = (username) => {
        navigate(`/users/${username}`);
    };

    const usersMap = users.map((user, key) => {
        return (
            <div className="userInList" onClick={() => viewProfile(user)} key={key}>
                <img className="profilePicInUserList" src={profilePic}/>
                <h2 className="usernameInList">{user}</h2>
            </div>
        )
    })

    return (
        <div className="usersList">
            {usersMap}
        </div>
    );
};

export default UsersList;

import { useParams } from 'react-router-dom';
import friendsService from '../../services/friendsService';
import useSearchedUser from '../../hooks/useSearchedUser'

const Profile = () => {
  const username = useParams().username;
  const user = useSearchedUser(username);

  const addFriend = async (username) => {
    try {
      const response = await friendsService.addFriend(username);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user.user && <h1>{user.user.id}</h1>}
      <button onClick={() => addFriend(username)}>Add</button>
    </div>
  );
};
export default Profile;

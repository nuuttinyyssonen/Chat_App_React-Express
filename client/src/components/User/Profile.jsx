import { useParams } from 'react-router-dom';
import useSearchedUser from '../../hooks/useSearchedUser'
import useAddFriend from '../../hooks/useAddFriend';

const Profile = () => {
  const username = useParams().username;
  const user = useSearchedUser(username);
  const [newFriend] = useAddFriend();
  return (
    <div>
      {user.user && <h1>{user.user.id}</h1>}
      <button onClick={() => newFriend(username)}>Add</button>
    </div>
  );
};
export default Profile;

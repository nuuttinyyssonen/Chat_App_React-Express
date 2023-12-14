import { SlLogout, SlSettings } from 'react-icons/sl';
import profile from '../../style/images/Profile_picture.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ handleLogout, user }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="header">
        {user.data && user.data?.profileImage && <img src={user.data.profileImage} style={{ width: '80px', height: '80px', borderRadius: '50%' }} className="profile-pic"/>}
        {user.data && !user.data?.profileImage && <img src={profile} style={{ width: '60px', height: '60px', borderRadius: '50%' }} className='profile-pic'/>}
        <div>
          {user.data && <h4>{user.data.firstName} {user.data.lastName}</h4>}
          {user.data && <p>{user.data.status}</p>}
        </div>
        <div className="menu">
          {user.data && <SlLogout id='logout' onClick={() => handleLogout(user.data._id)} className="icon"/>}
          <SlSettings onClick={() => navigate(`/profile/${user.data.username}`)} className="icon"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { SlLogout, SlSettings } from 'react-icons/sl';
import profile from '../../style/images/Profile_picture.png';

const Navbar = ({ handleLogout, search, setSearch, user }) => {
  return (
    <div className="navbar">
    <input className="search-input" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <div className="header">
        <img src={profile} className="profile-pic"/>
        <div>
          {user.user && <h4>{user.user.firstName} {user.user.lastName}</h4>}
          <p>...</p>
        </div>
        <div className="menu">
          <SlLogout onClick={handleLogout} className="icon"/>
          <SlSettings className="icon"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

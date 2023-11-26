import { SlLogout, SlSettings } from 'react-icons/sl';
import profile from '../../style/images/Profile_picture.png';

const Navbar = ({ handleLogout, search, setSearch, user }) => {
  return (
    <div className="navbar">
      <input className="search-input" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <div className="header">
        <img src={profile} className="profile-pic"/>
        <div>
          {user.data && <h4>{user.data.firstName} {user.data.lastName}</h4>}
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

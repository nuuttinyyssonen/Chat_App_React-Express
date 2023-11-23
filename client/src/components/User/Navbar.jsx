import { SlLogout, SlSettings } from "react-icons/sl";
import profile from '../../style/images/Profile_picture.png';

const Navbar = ({ handleLogout, search, setSearch }) => {
    return (
        <div className="navbar">
                <div className="header">
                    <img src={profile} className="profile-pic"/>
                    <div>
                        <h4>User name...</h4>
                        <p>paragraph...</p>
                    </div>
                    <div className="menu">
                        <SlLogout onClick={handleLogout} className="icon"/>
                        <SlSettings className="icon"/>
                    </div>
                </div>
                <input className="search-input" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
    );
};

export default Navbar;

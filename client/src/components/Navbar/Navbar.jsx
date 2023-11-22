import { useState } from "react";
// import { VscGear, VscSearch } from "react-icons/vsc";
import '../../style/main/navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <div className="navbar">
            <button onClick={handleLogout}>Logout</button>
            <input className="search-input" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
    );
};

export default Navbar;

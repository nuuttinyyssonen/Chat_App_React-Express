import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import UsersList from "./UsersList";
import FriendsList from "./FriendsList";
import useGetUsers from "../hooks/useGetUsers";
import useGetUserData from "../hooks/useGetUserData";

const UserBar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const users = useGetUsers(search);
    const user = useGetUserData();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <div className="left-side">
            <Navbar
                user={user}
                handleLogout={handleLogout}
                search={search}
                setSearch={setSearch}
            />
            {users
            ? <UsersList
                users={users}
            />
            : null}
            {user.user
            ? <FriendsList friends={user.user.friends}/>
            : null}
        </div>
    );
};

export default UserBar;

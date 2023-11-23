import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import userService from "../../services/userService";
import UsersList from "./UsersList";
import FriendsList from "./FriendsList";
import friendsService from "../../services/friendsService";

const UserBar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [users, setUsers] = useState();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    const getUserByUsername = async () => {
        try {
            const data = await userService.getUsers(search);
            const usernames = data.map(user => user.username);
            setUsers(usernames)
        } catch (error) {
            console.log(error);
        }
    };

    const getFriends = async () => {
        try {
            const data = await friendsService.getFriends();
            console.log(data.friends)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getFriends();
    }, [])

    useEffect(() => {
        if (search === '') {
            setUsers();
            return
        }
        const timeout = setTimeout(() => {
            getUserByUsername();
        }, 500)
        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div className="left-side">
            <Navbar
                handleLogout={handleLogout}
                search={search}
                setSearch={setSearch}
            />
            {users
            ? <UsersList
                users={users}
            />
            : null}
            <FriendsList />
        </div>
    );
};

export default UserBar;

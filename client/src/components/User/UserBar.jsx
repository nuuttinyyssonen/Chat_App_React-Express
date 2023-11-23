import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import userService from "../../services/userService";
import UsersList from "./UsersList";

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
        </div>
    );
};

export default UserBar;

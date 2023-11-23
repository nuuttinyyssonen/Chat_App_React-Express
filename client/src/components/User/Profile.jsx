import { useParams } from "react-router-dom";
import userService from "../../services/userService";
import friendsService from "../../services/friendsService";
import { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState();
    const username = useParams().username;

    const getSearchedUser = async () => {
        try {
            const data = await userService.getUser(username);
            const userObject = {
                username: data.username,
                id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            }
            setUser(userObject);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSearchedUser();
    }, []);

    const addFriend = async (username) => {
        try {
            const response = await friendsService.addFriend(username);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {user && <h1>{user.id}</h1>}
            <button onClick={() => addFriend(username)}>Add</button>
        </div>
    );
};
export default Profile;

import { useParams } from "react-router-dom";
import userService from "../../services/userService";
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

    return (
        <div>
            {user && <h1>{user.id}</h1>}
        </div>
    );
};
export default Profile;

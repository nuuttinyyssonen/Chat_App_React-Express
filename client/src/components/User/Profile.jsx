import { useParams } from "react-router-dom";
import userService from "../../services/userService";
import { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState();
    const username = useParams().username;

    const getSearchedUser = async () => {
        try {
            const data = userService.getUser(username);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSearchedUser();
    }, []);

    return (
        <div>
        </div>
    );
};
export default Profile;

import { useState, useEffect } from "react"
import friendsService from "../../services/friendsService";

const useGetUserData = () => {
    const [user, setUser] = useState();

    const getUserData = async () => {
        try {
            const data = await friendsService.getFriends();
            setUser(data)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getUserData();
    }, [])

    return { user }
};

export default useGetUserData;

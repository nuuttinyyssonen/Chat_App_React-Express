import axios from "axios";

const baseUrl = 'http://localhost:5000';
const token = localStorage.getItem('token');
const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
}

const addFriend = async (username) => {
    const response = await axios.put(`${baseUrl}/user/${username}`, null, config);
    return response.data;
}

const getFriends = async () => {
    const response = await axios.get(`${baseUrl}/friends`, config);
    return response.data;
}

export default {
    addFriend,
    getFriends
}

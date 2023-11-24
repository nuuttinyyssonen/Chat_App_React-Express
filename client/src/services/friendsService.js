import axios from 'axios';

const baseUrl = 'http://localhost:5000';
const getToken = () => {
  return localStorage.getItem('token');
};

const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `bearer ${token}`
    }
  };
};

const addFriend = async (username) => {
  const config = getConfig();
  const response = await axios.put(`${baseUrl}/user/${username}`, null, config);
  return response.data;
};

const getFriends = async () => {
  const config = getConfig();
  const response = await axios.get(`${baseUrl}/friends`, config);
  return response.data;
};

export default {
  addFriend,
  getFriends
};

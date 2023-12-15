import axios from 'axios';
import tokenService from './tokenService';

const baseUrl = 'http://localhost:5000';

const addFriend = async (username) => {
  const config = tokenService.getConfig();
  const response = await axios.put(`${baseUrl}/user/${username}`, null, config);
  return response.data;
};

const getFriends = async () => {
  const config = tokenService.getConfig();
  const response = await axios.get(`${baseUrl}/friends`, config);
  return response.data;
};

export default {
  addFriend,
  getFriends
};

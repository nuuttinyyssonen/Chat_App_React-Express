import axios from 'axios';
import tokenService from './tokenService';

const baseUrl = process.env.REACT_APP_API_URL || '';

const addFriend = async (username) => {
  const config = tokenService.getConfig();
  const response = await axios.put(`${baseUrl}/api/user/${username}`, null, config);
  return response.data;
};

const getFriends = async () => {
  const config = tokenService.getConfig();
  const response = await axios.get(`${baseUrl}/api/friends`, config);
  return response.data;
};

export default {
  addFriend,
  getFriends
};

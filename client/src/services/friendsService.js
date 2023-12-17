import axios from 'axios';
import tokenService from './tokenService';

const addFriend = async (username) => {
  const config = tokenService.getConfig();
  const response = await axios.put(`/api/user/${username}`, null, config);
  return response.data;
};

const getFriends = async () => {
  const config = tokenService.getConfig();
  const response = await axios.get('/api/friends', config);
  return response.data;
};

export default {
  addFriend,
  getFriends
};

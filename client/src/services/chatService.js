import axios from 'axios';
import tokenService from './tokenService';

const baseUrl = 'http://localhost:5000/chat';

const getChat = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createGroupChat = async (users) => {
  const config = tokenService.getConfig();
  const response = await axios.post(`${baseUrl}/groupChat`, users, config);
  return response.data;
};

export default {
  getChat,
  createGroupChat
};

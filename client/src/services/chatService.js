import axios from 'axios';
import tokenService from './tokenService';

const baseUrl = process.env.REACT_APP_API_URL || '';

const getChat = async (id) => {
  const response = await axios.get(`${baseUrl}/api/chat/${id}`);
  return response.data;
};

const createGroupChat = async (users) => {
  const config = tokenService.getConfig();
  const response = await axios.post(`${baseUrl}/api/chat/groupChat`, users, config);
  return response.data;
};

export default {
  getChat,
  createGroupChat
};

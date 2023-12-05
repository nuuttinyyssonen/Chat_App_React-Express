import axios from 'axios';

const baseUrl = 'http://localhost:5000/chat';
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

const getChat = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createGroupChat = async (users) => {
  const config = getConfig();
  const response = await axios.post(`${baseUrl}/groupChat`, users, config);
  return response.data;
};

const deleteMessage = async (chat, message) => {
  const response = await axios.delete(`${baseUrl}/${chat}/message/${message}`);
  console.log(response);
  return response.data;
};

export default {
  getChat,
  deleteMessage,
  createGroupChat
};

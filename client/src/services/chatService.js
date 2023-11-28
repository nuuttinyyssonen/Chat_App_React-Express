import axios from 'axios';

const baseUrl = 'http://localhost:5000/chat';

const getChat = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getChat
};

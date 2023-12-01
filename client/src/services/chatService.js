import axios from 'axios';

const baseUrl = 'http://localhost:5000/chat';

const getChat = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const deleteMessage = async (chat, message) => {
  const response = await axios.delete(`${baseUrl}/chat/${chat}/message/${message}`);
  return response.data;
}

export default {
  getChat,
  deleteMessage
};

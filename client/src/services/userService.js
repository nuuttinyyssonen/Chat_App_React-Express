import axios from 'axios';

const baseUrl = 'http://localhost:5000';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const createUser = async (user) => {
  const response = await axios.post(`${baseUrl}/signup`, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

const loginUser = async (user) => {
  const response = await axios.post(`${baseUrl}/login`, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export default {
  createUser,
  loginUser,
  setToken
};

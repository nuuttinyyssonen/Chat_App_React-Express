import axios from 'axios';

const baseUrl = 'http://localhost:5000';

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

const getUsers = async (username) => {
  const response = await axios.get(`${baseUrl}/users/${username}`);
  return response.data;
}

const getUser = async (username) => {
  const response = await axios.get(`${baseUrl}/user/${username}`);
  return response.data;
}

export default {
  createUser,
  loginUser,
  getUsers,
  getUser
};

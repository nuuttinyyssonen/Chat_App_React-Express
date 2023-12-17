import axios from 'axios';
import tokenService from './tokenService';

const createUser = async (user) => {
  const response = await axios.post('/api/signup', user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

const loginUser = async (user) => {
  const response = await axios.post('/api/login', user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

const getUsers = async (username) => {
  const config = tokenService.getConfig();
  const response = await axios.get(`/api/users/${username}`, config);
  return response.data;
};

const getUser = async (username) => {
  const response = await axios.get(`/api/user/${username}`);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`/api/user/id/${id}`);
  return response.data;
};

const getAuthUser = async () => {
  const config = tokenService.getConfig();
  const response = await axios.get('/api/user', config);
  return response.data;
};

const deleteUser = async () => {
  const config = tokenService.getConfig();
  const response = await axios.delete('/api/user', config);
  return response.data;
};

const changeProfilePicture = async (data) => {
  const token = tokenService.getToken();
  const response = await axios.put('/api/user/upload/image', data, {
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const updateUserField = async (field, data) => {
  const token = tokenService.getToken();
  const response = await axios.put(`/api/user/update/${field}`, data, {
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export default {
  createUser,
  loginUser,
  getUsers,
  getUser,
  getUserById,
  getAuthUser,
  deleteUser,
  changeProfilePicture,
  updateUserField
};

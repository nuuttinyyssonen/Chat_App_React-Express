import axios from 'axios';

const baseUrl = 'http://localhost:5000';
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

const RequestPasswordReseting = async (email) => {
  const response = await axios.post(`${baseUrl}/passwordReset`, email, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

const changePassword = async (password, token) => {
  const response = await axios.post(`${baseUrl}/passwordReset/${token}`, password, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export default {
  RequestPasswordReseting,
  changePassword
};

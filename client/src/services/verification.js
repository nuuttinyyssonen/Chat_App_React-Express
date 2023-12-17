import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || '';

const RequestPasswordReseting = async (email) => {
  const response = await axios.post(`${baseUrl}/api/passwordReset`, email, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

const changePassword = async (password, token) => {
  const response = await axios.post(`${baseUrl}/api/passwordReset/${token}`, password, {
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

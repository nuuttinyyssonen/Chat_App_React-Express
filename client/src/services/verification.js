import axios from 'axios';

const RequestPasswordReseting = async (email) => {
  const response = await axios.post('/passwordReset', email, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

const changePassword = async (password, token) => {
  const response = await axios.post(`/passwordReset/${token}`, password, {
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

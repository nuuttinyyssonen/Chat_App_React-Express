import { useState, useEffect } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const useGetUserData = () => {
  const [data, setData] = useState();
  const navigate = useNavigate()

  const getUserData = async () => {
    try {
      const response = await userService.getAuthUser();
      setData(response);
    } catch (error) {
      if (error.response?.data?.error === 'token invalid') {
        navigate('/');
      }
    }
  };

  const setEmail = (newEmail) => {
    setData((prev) => ({
      ...prev,
      email: newEmail
    }));
  };

  const setUsername = (newUsername) => {
    setData((prev) => ({
      ...prev,
      username: newUsername
    }));
  };

  const setStatus = (newStatus) => {
    setData((prev) => ({
      ...prev,
      status: newStatus
    }));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return { data, setEmail, setUsername, setData, setStatus };
};

export default useGetUserData;

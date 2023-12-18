import { useState, useEffect } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

// This custom hook is used in multiple files and it retrieves all users data and populates images, messages, chats and friends.
const useGetUserData = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await userService.getAuthUser();
      setData(response);
    } catch (error) {
      // User is navigated back to login page if token is expired or invalid.
      if (error.response?.data?.error === 'token invalid') {
        navigate('/');
      }
    }
  };

  // This is used to update state's email.
  const setEmail = (newEmail) => {
    setData((prev) => ({
      ...prev,
      email: newEmail
    }));
  };

  // This is used to update state's username.
  const setUsername = (newUsername) => {
    setData((prev) => ({
      ...prev,
      username: newUsername
    }));
  };

  // This is used to update state's status.
  const setStatus = (newStatus) => {
    setData((prev) => ({
      ...prev,
      status: newStatus
    }));
  };

  // This is used to update state's theme.
  const setChangeTheme = (newTheme) => {
    setData((prev) => ({
      ...prev,
      isDarkMode: newTheme
    }));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return { data, setEmail, setUsername, setData, setStatus, setChangeTheme };
};

export default useGetUserData;

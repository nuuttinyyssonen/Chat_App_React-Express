import { useState, useEffect } from 'react';
import userService from '../services/userService';

const useGetUserData = () => {
  const [data, setData] = useState();

  const getUserData = async () => {
    try {
      const response = await userService.getAuthUser();
      setData(response);
    } catch (error) {
      console.log(error);
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

  const setProfilePic = (newProfilePic) => {
    setData((prev) => ({
      ...prev,
      profileImage: newProfilePic
    }));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return { data, setEmail, setUsername, setProfilePic, setData };
};

export default useGetUserData;

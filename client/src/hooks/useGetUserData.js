import { useState, useEffect } from 'react';
import userService from '../services/userService';

const useGetUserData = () => {
  const [user, setUser] = useState();

  const getUserData = async () => {
    try {
      const data = await userService.getAuthUser();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return { user };
};

export default useGetUserData;

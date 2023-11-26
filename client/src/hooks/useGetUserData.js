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

  useEffect(() => {
    getUserData();
  }, []);

  return { data };
};

export default useGetUserData;

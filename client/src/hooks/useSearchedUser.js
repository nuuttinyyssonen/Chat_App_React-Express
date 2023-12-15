import { useEffect, useState } from 'react';
import userService from '../services/userService';

const useSearchedUser = (username) => {
  const [data, setData] = useState();

  const getSearchedUser = async () => {
    if (!username) {
      return;
    }
    try {
      const response = await userService.getUser(username);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const setPic = (data) => {
    setData((prev) => ({
      ...prev,
      profileImage: data
    }))
  };

  useEffect(() => {
    getSearchedUser();
  }, [username]);

  return { data, setPic };
};

export default useSearchedUser;

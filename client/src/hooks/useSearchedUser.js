import { useEffect, useState } from 'react';
import userService from '../services/userService';

// Custom hook gets user data based on username
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

  // This is used to update state's profile picture.
  const setPic = (data) => {
    setData((prev) => ({
      ...prev,
      profileImage: data
    }));
  };

  useEffect(() => {
    getSearchedUser();
  }, [username]);

  return { data, setPic };
};

export default useSearchedUser;

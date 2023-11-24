import { useEffect, useState } from 'react';
import userService from '../services/userService';

const useSearchedUser = (username) => {
  const [user, setUser] = useState();

  const getSearchedUser = async () => {
    try {
      const data = await userService.getUser(username);
      const userObject = {
        username: data.username,
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      };
      setUser(userObject);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchedUser();
  }, [username]);

  return { user };
};

export default useSearchedUser;

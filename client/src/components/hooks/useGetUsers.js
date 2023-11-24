import { useState, useEffect } from 'react';
import userService from '../../services/userService';

const useGetUsers = (value) => {
  const [users, setUsers] = useState();

  const getUserByUsername = async () => {
    try {
      const data = await userService.getUsers(value);
      const usernames = data.map(user => user.username);
      setUsers(usernames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (value === '') {
      setUsers();
      return;
    }
    const timeout = setTimeout(() => {
      getUserByUsername();
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return { users };
};

export default useGetUsers;

import { useState, useEffect } from 'react';
import userService from '../services/userService';

// This custom hook get's all users based on input field's value.
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

  // Request is only being sent every half a second and not if input's value is empty.
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

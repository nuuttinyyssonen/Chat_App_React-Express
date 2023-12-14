import friendsService from '../services/friendsService';
import { useState } from 'react';
const useAddFriend = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const newFriend = async (username) => {
    try {
      await friendsService.addFriend(username);
      setSuccessMessage('Contact was successfully created!');
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      if (error?.response?.data?.error) {
        setErrorMessage(error?.response?.data?.error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000)
      }
    }
  };

  return [newFriend, errorMessage, successMessage];
};

export default useAddFriend;

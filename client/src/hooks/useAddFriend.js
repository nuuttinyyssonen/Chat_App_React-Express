import friendsService from '../services/friendsService';
import { useState } from 'react';
const useAddFriend = () => {
  // This custom hook is used in profile, in adding a new contact.
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const newFriend = async (username) => {
    try {
      await friendsService.addFriend(username);
      setSuccessMessage('Contact was successfully created!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      // If user is already a friend, error is thrown and displayed.
      if (error?.response?.data?.error) {
        setErrorMessage(error?.response?.data?.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }
  };

  return [newFriend, errorMessage, successMessage];
};

export default useAddFriend;

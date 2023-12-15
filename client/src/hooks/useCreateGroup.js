import { useState } from 'react';
import chatService from '../services/chatService';
//This custom hook is used for creating new group chat.
const useCreateGroup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const createGroup = async (group) => {
    try {
      const response = await chatService.createGroupChat(group);
      setSuccessMessage('Group chat created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return response;
    } catch (error) {
      // Error is thrown if for example group chat for 2 people is tried to create.
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, [5000]);
      }
    }
  };
  return [createGroup, errorMessage, successMessage];
};

export default useCreateGroup;

import { useState, useEffect } from 'react';
import friendsService from '../services/friendsService';

const useAddFriend = () => {
  const [user, setUser] = useState();

  const newFriend = async (username) => {
    try {
      const data = friendsService.addFriend(username);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return [newFriend];
};

export default useAddFriend;

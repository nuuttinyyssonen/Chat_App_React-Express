import { useState, useEffect } from 'react';
import friendsService from '../services/friendsService';

const useGetFriends = () => {
  const [friends, setFriends] = useState();

  const queryFriends = async () => {
    try {
      const data = await friendsService.getFriends();
      setFriends(data);
      console.log(friends);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    queryFriends();
  }, []);

  return { friends };
};

export default useGetFriends;

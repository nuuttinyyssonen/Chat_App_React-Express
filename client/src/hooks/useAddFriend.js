import { useState, useEffect } from 'react';
import friendsService from '../services/friendsService';

const useAddFriend = () => {
  const newFriend = async (username) => {
    try {
      await friendsService.addFriend(username);
    } catch (error) {
      console.log(error);
    }
  };

  return [newFriend];
};

export default useAddFriend;

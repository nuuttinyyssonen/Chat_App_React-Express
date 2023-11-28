import { useEffect, useState } from 'react';
import chatService from '../services/chatService';
import { useParams } from 'react-router-dom';

const useGetChat = () => {
  const [chat, setChat] = useState();
  const id = useParams().id;

  const queryChat = async () => {
    try {
      const data = await chatService.getChat(id);
      console.log(data);
      setChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    queryChat();
  }, [id]);
  return { chat };
};

export default useGetChat;
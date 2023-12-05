import { useEffect, useState } from 'react';
import chatService from '../services/chatService';
import { useParams } from 'react-router-dom';

const useGetChat = () => {
  const [chat, setChat] = useState();
  const id = useParams().id;

  const queryChat = async () => {
    if (!id) {
      return;
    }
    try {
      const data = await chatService.getChat(id);
      setChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addMessage = (newMessage) => {
    setChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat.messages, newMessage]
    }));
  };

  useEffect(() => {
    queryChat();
  }, [id]);
  return { chat, addMessage, setChat };
};

export default useGetChat;

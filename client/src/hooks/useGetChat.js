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

  const setName = (newName) => {
    setChat((prevChat) => ({
      ...prevChat,
      chatName: newName
    }));
  };

  const addMessage = (newMessage) => {
    setChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat.messages, newMessage]
    }));
  };

  const addImage = (newImage) => {
    setChat((prevChat) => ({
      ...prevChat,
      images: [...prevChat.images, newImage]
    }))
  };

  useEffect(() => {
    queryChat();
  }, [id]);

  return { chat, addMessage, setChat, setName, addImage };
};

export default useGetChat;

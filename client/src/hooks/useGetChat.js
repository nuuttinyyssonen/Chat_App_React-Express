import { useEffect, useState } from 'react';
import chatService from '../services/chatService';
import { useParams } from 'react-router-dom';

// This custom hook is used to get a specific chat based on params.
const useGetChat = () => {
  const [chat, setChat] = useState();
  const id = useParams().id;

  const queryChat = async () => {
    // If user is not in chat room, then we don't query for chat.
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

  // This is used to update state's chatName.
  const setName = (newName) => {
    setChat((prevChat) => ({
      ...prevChat,
      chatName: newName
    }));
  };

  // This is used to update state's messages.
  const addMessage = (newMessage) => {
    setChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat.messages, newMessage]
    }));
  };

  // This is used to update state's images 
  const addImage = (newImage) => {
    setChat((prevChat) => ({
      ...prevChat,
      images: [...prevChat.images, newImage]
    }));
  };

  useEffect(() => {
    queryChat();
  }, [id]);

  return { chat, addMessage, setChat, setName, addImage };
};

export default useGetChat;

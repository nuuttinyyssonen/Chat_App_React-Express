import { useState } from "react";
import chatService from "../services/chatService";
const useCreateGroup = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const createGroup = async (group) => {
        try {
            await chatService.createGroupChat(group);
        } catch (error) {
          if (error.response?.data?.error) {
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage('');
            }, [5000]);
          }
        }
    };
    return [createGroup, errorMessage];
};

export default useCreateGroup;

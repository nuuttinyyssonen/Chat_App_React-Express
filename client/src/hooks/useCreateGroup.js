import { useState } from "react";
import chatService from "../services/chatService";
const useCreateGroup = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const createGroup = async (group) => {
        try {
            await chatService.createGroupChat(group);
            setSuccessMessage("Group chat created successfully!");
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
        } catch (error) {
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

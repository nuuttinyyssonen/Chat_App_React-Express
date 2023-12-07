import ProfileDetails from "./ProfileDetails";
import userService from "../../services/userService";
import { useEffect, useState, useRef } from "react";
const ProfileDetailsContainer = ({ isAuthenticated, navigate, currentUser }) => {
    const [isEmailEditMode, setIsEmailEditMode] = useState(false);
    const [isUsernameEditMode, setIsUsernameEditMode] = useState(false);

    const [emailField, setEmailField] = useState("");
    const [email, setEmail] = useState("");

    const [usernameField, setUsernameField] = useState("");
    const [usernameValue, setUsernameValue] = useState("");

    const [errorMessageUsername, setErrorMessageUsername] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");

    const statusRef = useRef(null);

    useEffect(() => {
        setEmail(currentUser?.data?.email);
        setUsernameValue(currentUser?.data?.username);
    }, [currentUser])

    const changeEmail = async () => {
        try {
          const data = await userService.updateUserField('email', { email: emailField });
          currentUser.setEmail(data.email);
          setIsEmailEditMode(false);
        } catch (error) {
          if (error.response?.data?.error) {
            setErrorMessageEmail(error.response?.data?.error)
            setTimeout(() => {
              setErrorMessageEmail("");
            }, [5000])
          }
        }
    };

    const changeUsername = async () => {
        try {
          const data = await userService.updateUserField('username', { username: usernameField })
          currentUser.setUsername(data.username);
          setIsUsernameEditMode(false);
          navigate(`/profile/${data.username}`);
        } catch (error) {
          if (error.response?.data?.error) {
            setErrorMessageUsername(error.response?.data?.error)
            setTimeout(() => {
              setErrorMessageUsername("");
            }, [5000])
          }
        }
    };

    return (
        <div>
        <ProfileDetails
          statusRef={statusRef}
          isEditMode={isEmailEditMode}
          setIsEditMode={setIsEmailEditMode}
          user={currentUser}
          detail={email}
          type='E-Mail'
          updateDetail={changeEmail}
          field={emailField}
          setField={setEmailField}
          errorMessage={errorMessageUsername}
          isAuthenticated={isAuthenticated}
        />
        <ProfileDetails
          isEditMode={isUsernameEditMode}
          statusRef={statusRef}
          setIsEditMode={setIsUsernameEditMode}
          user={currentUser}
          detail={usernameValue}
          type='Username'
          updateDetail={changeUsername}
          field={usernameField}
          setField={setUsernameField}
          errorMessage={errorMessageEmail}
          isAuthenticated={isAuthenticated}
        />
        </div>
    );
};

export default ProfileDetailsContainer;

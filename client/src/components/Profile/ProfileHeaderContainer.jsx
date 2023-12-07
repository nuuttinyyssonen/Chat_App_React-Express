import ProfileHeader from "./ProfileHeader";
import { useState } from "react";
import userService from "../../services/userService";
import ImagePreview from "../Chat/ImagePreview";
const ProfileHeaderContainer = ({ user, isAuthenticated, newFriend, navigate, username }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const changeProfilePic = async () => {
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
          const response = await userService.changeProfilePicture(formData);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
    };

    const deleteProfile = async () => {
        if (window.confirm('Do you really want to delete this account?')) {
          try {
            await userService.deleteUser();
            navigate('/');
          } catch (error) {
            console.log(error);
          }
        }
    };

    return (
        <div>
        <ProfileHeader
          user={user}
          addFriend={newFriend}
          username={username}
          isAuthenticated={isAuthenticated}
          deleteProfile={deleteProfile}
          setSelectedImage={setSelectedImage}
          changeProfilePic={changeProfilePic}
          selectedImage={selectedImage}
        />
        </div>
    );
};

export default ProfileHeaderContainer;

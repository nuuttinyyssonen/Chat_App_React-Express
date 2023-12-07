import ProfileHeader from "./ProfileHeader";
import { useState } from "react";
import userService from "../../services/userService";
const ProfileHeaderContainer = ({ user, isAuthenticated, newFriend, navigate, username }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const changeProfilePic = async () => {
        const reader = new FileReader();
        if (selectedImage) {
          reader.onload = async () => {
            try {
              const data = await userService.changeProfilePicture({ dataUrl: reader.result });
              console.log(data);
            } catch (error) {
              console.log(error);
            }
          };
          reader.readAsDataURL(selectedImage)
          setSelectedImage(null)
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
        />
        </div>
    );
};

export default ProfileHeaderContainer;

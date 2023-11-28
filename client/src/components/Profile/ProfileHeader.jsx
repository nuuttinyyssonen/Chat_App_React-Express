import profile from '../../style/images/Profile_picture.png';
import { SlUserFollow, SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin } from "react-icons/sl";
const ProfileHeader = ({ user, addFriend, username }) => {
    return (
        <div className='profileHeader'>
            <img className='ProfileImage' src={profile}/>
            {user.user && <p className='PersonName'>{user.user.firstName} {user.user.lastName} <SlUserFollow onClick={() => addFriend(username)} className='follow'/></p>}
            <p className='personDetails'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            <div className='socialMediaContainer'>
                <SlSocialInstagram className='socialMedia' />
                <SlSocialLinkedin className='socialMedia' />
                <SlSocialTwitter className='socialMedia' />
            </div>
        </div>
    );
};

export default ProfileHeader;

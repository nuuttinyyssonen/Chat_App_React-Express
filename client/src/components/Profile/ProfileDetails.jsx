const ProfileDetails = ({ user }) => {
    return (
        <div className="profileDetails">
            {user.user && <p>E-Mail: {user.user.email}</p>}
            {user.user && <p>Username: {user.user.username}</p>}
        </div>
    );
};

export default ProfileDetails;

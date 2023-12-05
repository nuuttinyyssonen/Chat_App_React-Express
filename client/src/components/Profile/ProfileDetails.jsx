const ProfileDetails = ({ user }) => {
  return (
    <div className="profileDetails">
      {user.data && <p>E-Mail: {user.data.email}</p>}
      {user.data && <p>Username: {user.data.username}</p>}
    </div>
  );
};

export default ProfileDetails;

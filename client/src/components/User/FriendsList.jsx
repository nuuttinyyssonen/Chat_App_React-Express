const FriendsList = ({ friends }) => {
    return (
        friends && (
            <div>
                {friends.map((friend, key) => (
                    <div key={key}>
                        <p>{friend}</p>
                    </div>
                ))}
            </div>
        )
    );
};

export default FriendsList;

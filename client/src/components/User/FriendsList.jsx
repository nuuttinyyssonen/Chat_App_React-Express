import profilePic from '../../style/images/Profile_picture.png';
import { useNavigate } from 'react-router-dom';
import socket from '../../socketConfig';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoDotFill } from "react-icons/go";
import { initalizeUsers } from '../../reducers/onlineUserReducer';

const FriendsList = ({ friends, chats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToChat = (id, firstName, lastName) => {
    navigate(`/chat/${id}`, { state: { firstName, lastName } });
  };

  const onlineUsers = useSelector(({ onlineUsers }) => {
    return onlineUsers;
  })

  useEffect(() => {
    socket.on('online', (data) => {
      console.log("data from server", data)
      dispatch(initalizeUsers(data));
    });
  }, [socket]);

  const listMap = () => (
    friends.map((friend, key) => {
      const fullMessage = chats[key].messages.length > 0 ? chats[key].messages[chats[key].messages.length - 1].message : ""
      const message = fullMessage.length > 30 ? fullMessage.substring(0, 30) + "..." : fullMessage;
      const isOnline = onlineUsers.includes(friend._id)
      return (
        <div id='friend' className='friendsList' key={key} onClick={() => navigateToChat(chats[key]._id, friend.firstName, friend.lastName)}>
        <GoDotFill className={isOnline ? 'onlineStatus' : 'offlineStatus'}/>
          <img className="profilePicInUserList" src={profilePic} style={{ width: '60px' }} />
          <div className='friendDetails'>
            <div className='friendName'>
              <p className='name'>{friend.firstName}</p>
              <p className='name'>{friend.lastName}</p>
            </div>
            <p className='latestMessage'>{message}</p>
          </div>
        </div>
      );
    })
  );
  return (
    friends && (
      <div className='friendsContainer'>
        {listMap()}
      </div>
    )
  );
};

export default FriendsList;

const Chat = require('../models/chat');

const handleGroupNameChange = async (io, data) => {
  const { room, updatedName } = data;
  const chat = await Chat.findById(room);
  if (!chat) {
    return io.in(room).emit('error', 'This chat does not exist anymore!');
  }
  try {
    chat.chatName = updatedName;
    await chat.save();
    const updatedChat = await Chat.findById(room).populate({
      path: 'messages',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
      .populate({
        path: 'images',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
      .populate('users');
    io.in(room).emit('updated_chat', updatedChat);
  } catch (error) {
    return io.in(room).emit('error', error);
  }
};

module.exports = { handleGroupNameChange };

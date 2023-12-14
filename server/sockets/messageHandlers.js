const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');

const handleSendMessage = async (io, data) => {
  // New Message records are created and their ids are pushed into specific chat room.
  const { message, room, userId } = data;
  const chatRoom = await Chat.findById(room);
  if (!chatRoom) {
    return io.in(room).emit('error', 'This chat does not exist anymore!');
  }
  try {
    const chatMessage = new ChatMessage({
      message,
      user: userId,
      chat: room
    });
    const msg = await chatMessage.save();
    chatRoom.messages.push(msg._id);
    await chatRoom.save();
    const queriedMessage = await ChatMessage.findById(msg._id).populate('user');
    // Messages are being sent back to client so the chat is updated in real-time.
    io.in(room).emit('receive_message', queriedMessage);
  } catch (error) {
    io.in(room).emit('error', error)
  }
};

const handleTyping = (io, data) => {
  // Sends specific users a text if user is typing.
  const { room, typing } = data;
  if (typing === true) {
    io.in(room).emit('display', data);
  } else {
    io.in(room).emit('display', data);
  }
};

module.exports = { handleSendMessage, handleTyping };

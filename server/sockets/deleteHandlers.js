const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');
const ChatImage = require('../models/chatImage');

const handleDeleteMessage = async (io, data) => {
    const { message, room } = data;
    const chatRoom = await Chat.findById(room);
    const chatMessage = await ChatMessage.findById(message);
    chatRoom.messages = chatRoom.messages.filter(message => message.toString() !== chatMessage._id.toString());
    await chatRoom.save();
    await chatMessage.deleteOne();

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
};

const handleDeleteImage = async (io, data) => {
    const { image, room } = data;
    const chatRoom = await Chat.findById(room);
    const chatImage = await ChatImage.findById(image);
    chatRoom.images = chatRoom.images.filter(image => image.toString() !== chatImage._id.toString());
    await chatRoom.save();
    await chatImage.deleteOne();

    const updatedChat = await Chat.findById(room).populate({
        path: 'images',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
      .populate({
        path: 'messages',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
      .populate('users');
    io.in(room).emit('updated_chat', updatedChat);
};

module.exports = { handleDeleteMessage, handleDeleteImage };
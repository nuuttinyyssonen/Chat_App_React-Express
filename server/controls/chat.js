const chatRouter = require('express').Router();
const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');
const ChatImage = require('../models/chatImage');
const User = require('../models/user');
const { tokenExtractor } = require('../utils/middleware');

// Gets chat by Id
chatRouter.get('/:id', async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate({
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
    if (!chat) {
      return res.status(404).json({ error: 'chat was not found!' });
    }
    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});


// Creating group chat and adds created chat id to every users chat array.
chatRouter.post('/groupChat', tokenExtractor, async (req, res, next) => {
  const usernames = req.body;
  const user = await User.findById(req.decodedToken.id);
  try {
    const users = await User.find({ username: { $in: usernames } });
    const chat = new Chat({
      users: users.map(user => user._id)
    });
    chat.users.push(user);
    // Group chats must have more than 2 users otherwise error is thrown.
    if (chat.users.length <= 2) {
      return res.status(400).json({ error: 'Group chats must have more than 2 persons' });
    }
    const groupChat = await chat.save();
    user.chats.push(groupChat._id);
    await user.save();
    // new chat id is pushed in all users chats array.
    for (let i = 0; i < users.length; i++) {
      users[i].chats.push(groupChat._id);
      await users[i].save();
    }
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

// Deleting chats. Mostly used in tests.
chatRouter.delete('/:id', async (req, res, next) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

// Changing group chat's name.
chatRouter.put('/:id', async (req, res, next) => {
  const groupChatName = req.body.groupChatName;
  // Error is thrown if condition is not met.
  if (groupChatName.length < 3) {
    return res.status(400).json({ error: 'Group chat name must be longer than 3 characters' });
  }
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      res.status(404).json({ error: 'Chat was not found!' });
    }
    chat.chatName = groupChatName;
    const updatedChat = await chat.save();
    res.status(200).json(updatedChat);
  } catch (error) {
    next(error);
  }
});

// Deleting specific message in specific chat room.
chatRouter.delete('/:chat/message/:message', async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chat);
    // Filtering all messages to not include the message sent with params.
    chat.messages = chat.messages.filter(message => message !== req.params.message);
    await chat.save();
    const newChat = await Chat.findById(req.params.chat)
      .populate({
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
    await ChatMessage.findByIdAndDelete(req.params.message);
    res.status(200).json(newChat);
  } catch (error) {
    next(error);
  }
});

// Deleting specific image in specific chat room.
chatRouter.delete('/:chat/image/:image', async (req, res, next) => {
  const chat = await Chat.findById(req.params.chat);
  try {
    // Filtering all images to not include the image sent with params.
    chat.images = chat.images.filter(image => image !== req.params.image);
    await chat.save();
    const newChat = await Chat.findById(req.params.chat)
      .populate({
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
    await ChatImage.findByIdAndDelete(req.params.image);
    res.status(200).json(newChat);
  } catch (error) {
    next(error);
  }
});

module.exports = chatRouter;

const chatRouter = require('express').Router();
const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');
const User = require('../models/user');
const { tokenExtractor } = require('../utils/middleware');

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
        if(!chat) {
            return res.status(404).json({ error: "chat was not found!" });
        }
        return res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
});

chatRouter.post('/groupChat', tokenExtractor, async (req, res, next) => {
    const usernames = req.body;
    const user = await User.findById(req.decodedToken.id);
    try {
        const users = await User.find({ username: { $in: usernames } });
        const chat = new Chat({
            users: users.map(user => user._id)
        });
        chat.users.push(user);
        if(chat.users.length <= 2) {
            return res.status(400).json({ "error": "Group chats must have more than 2 persons" });
        }
        const groupChat = await chat.save();
        user.chats.push(groupChat._id);
        await user.save();
        for (let i = 0; i < users.length; i++ ){
            users[i].chats.push(groupChat._id);
            await users[i].save();
        }
        res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
});

chatRouter.delete('/:id', async (req, res, next) => {
    try {
        const chat = await Chat.findByIdAndDelete(req.params.id);
        res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
});

chatRouter.put('/:id', async (req, res, next) => {
    const groupChatName = req.body.groupChatName;
    if (groupChatName.length < 3) {
        return res.status(400).json({ error: "Group chat name must be longer than 3 characters" });
    }
    try {
        const chat = await Chat.findById(req.params.id);
        if(!chat) {
            res.status(404).json({ error: "Chat was not found!" });
        }
        chat.chatName = groupChatName;
        const updatedChat = await chat.save();
        res.status(200).json(updatedChat);
    } catch (error) {
        next(error);
    }
});

chatRouter.delete('/:chat/message/:message', async (req, res, next) => {
    try {
        const chat = await Chat.findById(req.params.chat);
        chat.messages = chat.messages.filter(message => message != req.params.message);
        await chat.save();
        const newChat = await Chat.findById(req.params.chat)
            .populate({
                path: 'messages',
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

module.exports = chatRouter;

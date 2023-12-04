const chatRouter = require('express').Router();
const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');
const User = require('../models/user');

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
            .populate('users');
        if(!chat) {
            return res.status(404).json({ error: "chat was not found!" });
        }
        return res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
});

chatRouter.post('/groupChat', async (req, res, next) => {
    const usernames = req.body;
    try {
        const users = await User.find({ username: { $in: usernames } });
        const chat = new Chat({
            users: users.map(user => user._id)
        });
        const groupChat = await chat.save();
        for (let i = 0; i < users.length; i++ ){
            users[i].chats.push(groupChat._id);
            await users[i].save();
        }
        res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
});

chatRouter.delete('/chat/:chat/message/:message', async (req, res, next) => {
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

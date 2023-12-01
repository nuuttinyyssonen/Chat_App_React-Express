const chatRouter = require('express').Router();
const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');

chatRouter.get('/:id', async (req, res, next) => {
    try {
        const chat = await Chat.findById(req.params.id).populate('messages');
        if(!chat) {
            return res.status(404).json({ error: "chat was not found!" });
        }
        return res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
})

chatRouter.delete('/chat/:chat/message/:message', async (req, res, next) => {
    try {
        const chat = await Chat.findById(req.params.chat);
        chat.messages = chat.messages.filter(message => message != req.params.message);
        await chat.save();
        const newChat = await Chat.findById(req.params.chat).populate('messages');
        await ChatMessage.findByIdAndDelete(req.params.message);
        res.status(200).json(newChat);
    } catch (error) {
        next(error);
    }
});

module.exports = chatRouter;

const chatRouter = require('express').Router();
const Chat = require('../models/chat');
const User = require('../models/user');

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

module.exports = chatRouter;

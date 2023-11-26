const chatRouter = require('express').Router();
const Chat = require('../models/chat');
const User = require('../models/user');
const { tokenExtractor } = require('../utils/middleware');

chatRouter.get('/:id', tokenExtractor, async (req, res) => {
    const chat = await Chat.findById(req.params.id);
    if(!chat) {
        return res.status(404).json({ error: "chat was not found!" });
    }
    return res.status(200).json(chat);
})

module.exports = chatRouter;

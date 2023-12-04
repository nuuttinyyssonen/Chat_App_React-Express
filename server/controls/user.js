const userRouter = require('express').Router();
const User = require('../models/user');
const Chat = require('../models/chat');
const { tokenExtractor } = require('../utils/middleware');

userRouter.get('/:username', async(req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if(!user) {
        return res.status(404).json({ error: "user was not found!" });
    }
    res.status(200).json(user);
});

userRouter.get('/id/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({ error: "user was not found!" });
    }
    res.status(200).json(user);
});

userRouter.get('/', tokenExtractor, async(req, res) => {
    const user = await User.findById(req.decodedToken.id)
        .populate([
            {
                path: 'chats',
                populate: [
                    {
                        path: 'messages',
                        model: 'ChatMessage'
                    },
                    {
                        path: 'users',
                        model: 'User'
                    }
                ]
            },
            {
                path: 'friends'
            }
        ]);
    if(!user) {
        res.status(404).json({ error: "User was not found!" })
    }
    res.status(200).json(user);
})

userRouter.delete('/', tokenExtractor, async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.decodedToken.id);
        res.status(200).send("User was successfully deleted");
    } catch(error) {
        next(error);
    }
});

userRouter.put('/:username', tokenExtractor, async(req, res, next) => {
    const userToAdd = await User.findOne({ username: req.params.username });
    const user = await User.findById(req.decodedToken.id);
    if(user.friends.includes(userToAdd._id)) {
        return res.status(400).json({ error: "This user is already in your friends" });
    }
    const chat = new Chat({
        users: [
            user._id,
            userToAdd._id
        ]
    });
    try {
        const savedChat = await chat.save();
        user.chats.push(savedChat._id);
        user.friends.push(userToAdd._id);
        userToAdd.chats.push(savedChat._id);
        userToAdd.friends.push(user._id);
        await user.save();
        await userToAdd.save();
        res.status(200).send(user);
    } catch(error) {
        next(error);
    }
});

module.exports = userRouter;
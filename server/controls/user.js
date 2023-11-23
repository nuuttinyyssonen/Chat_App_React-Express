const userRouter = require('express').Router();
const User = require('../models/user');
const { tokenExtractor } = require('../utils/middleware');

userRouter.get('/:username', async(req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if(!user) {
        return res.status(404).json({ error: "user was not found!" });
    }
    res.status(200).json(user);
});

userRouter.put('/:username', tokenExtractor, async(req, res, next) => {
    const userToAdd = await User.findOne({ username: req.params.username });
    const user = await User.findById(req.decodedToken.id);
    if(user.friends.includes(userToAdd._id)) {
        return res.status(400).json({ error: "This user is already in your friends" });
    }
    try {
        user.friends.push(userToAdd._id);
        await user.save();
        res.status(200).send(user);
    } catch(error) {
        next(error);
    }
});

module.exports = userRouter;
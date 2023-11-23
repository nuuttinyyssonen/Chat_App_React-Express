const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/:username', async(req, res, next) => {
    const user = await User.find({ username: { $regex: req.params.username } });
    if(!user) {
        res.status(404).json({ "error": "user was not found!" });
    }
    res.status(200).json(user);
});

module.exports = usersRouter;
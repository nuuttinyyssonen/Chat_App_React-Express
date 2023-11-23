const userRouter = require('express').userRouter;
const User = require('../models/user');

userRouter.get('/:username', async(req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if(!user) {
        return res.status(404).json({ error: "user was not found!" });
    }
    res.status(200).json(user);
});

module.exports = userRouter;
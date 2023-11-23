const friendsRouter = require('express').Router();
const User = require('../models/user');
const { tokenExtractor } = require('../utils/middleware');

friendsRouter.get('/', tokenExtractor, async(req, res) => {
    const user = await User.findById(req.decodedToken.id);
    if(!user) {
        res.status(404).json({ error: "User was not found!" })
    }
    res.status(200).json(user);
})

module.exports = friendsRouter;
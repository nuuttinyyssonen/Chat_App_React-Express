const friendsRouter = require('express').Router();
const { tokenExtractor } = require('../utils/middleware');
const User = require('../models/user');

friendsRouter.get('/', tokenExtractor, async (req, res) => {
    const user = await User.findById(req.decodedToken.id);
    const friends = await User.find({ _id: { $in: user.friends } });
    if(!friends) {
        res.status(404).json({ error: "No friend were found!" })
    }
    res.status(200).json(friends);
})

module.exports = friendsRouter;
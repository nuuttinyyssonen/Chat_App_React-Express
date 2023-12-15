const resetCypressRouter = require('express').Router();
const User = require('../models/user');

// This route is used for cypress tests.
resetCypressRouter.delete('/', async (req, res, next) => {
  const { user1, user2, user3 } = req.body;
  try {
    const deletedUser1 = await User.findOneAndDelete({ username: user1 });
    const deletedUser2 = await User.findOneAndDelete({ username: user2 });
    const deletedUser3 = await User.findOneAndDelete({ username: user3 });
    res.status(200).json(deletedUser1, deletedUser2, deletedUser3);
  } catch (error) {
    next(error);
  }
});

module.exports = resetCypressRouter;

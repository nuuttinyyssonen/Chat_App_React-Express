const resetCypressRouter = require('express').Router();
const User = require('../models/user');

// This route is used for cypress tests.
resetCypressRouter.delete('/', async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ username: 'cypresstest' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = resetCypressRouter;

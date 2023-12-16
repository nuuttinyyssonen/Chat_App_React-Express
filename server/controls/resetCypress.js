const resetCypressRouter = require('express').Router();
const User = require('../models/user');

// This route is used for cypress tests.
resetCypressRouter.delete('/:username', async (req, res, next) => {
  const username = req.params.username;
  try {
    await User.findOneAndDelete({ username });
    res.status(200).send('users deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = resetCypressRouter;

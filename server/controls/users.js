const usersRouter = require('express').Router();
const User = require('../models/user');
const { tokenExtractor } = require('../utils/middleware');

usersRouter.get('/:username', tokenExtractor, async (req, res) => {
  // Returns all users that includes what parameters contains.
  const users = await User.find({ username: { $regex: req.params.username } });
  const currentUser = await User.findById(req.decodedToken.id);
  if (!users) {
    res.status(404).json({ error: 'no users were found!' });
  }
  if (!currentUser) {
    res.status(400).json({ error: 'you are not logged in!' })
  }
  // Filtering current user out.
  const updatedUsers = users.filter(user => user._id.toString() !== currentUser._id.toString());
  res.status(200).json(updatedUsers);
});

module.exports = usersRouter;

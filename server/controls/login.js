const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const { SECRET } = require('../utils/config');

// Retrieves authentication token for logged in user.
loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  // Checks if password is correct with bcrypt library by comparing it.
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // Error if user does not exist or password is invalid.
  if (!(user && passwordCorrect)) {
    return res.status(400).json({ error: 'Invalid password or username' });
  };

  const userForToken = {
    username: user.username,
    id: user._id
  };
  // Token is signed for user with jwt library.
  const token = jwt.sign(userForToken, SECRET);
  res.status(200).json({ token, username: user.username, id: user._id });
});

module.exports = loginRouter;

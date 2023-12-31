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
  const token = jwt.sign(userForToken, SECRET, { expiresIn: '7d' }); // 7 days validity for "Remember Me"
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // set to true in production (HTTPS)
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  });
  res.status(200).json({ token, username: user.username, id: user._id });
});

module.exports = loginRouter;

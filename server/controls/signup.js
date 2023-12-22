const User = require('../models/user');
const signupRouter = require('express').Router();
const bcrypt = require('bcrypt');

// Creates users and stores them in mongodb
signupRouter.post('/', async (req, res, next) => {
  const { username, password, firstName, lastName, email } = req.body;

  // Error is thrown is following conditions are not met. Error is also displayed in client side.
  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'Password or username must be greater than 3' });
  };

  // Password is hashed in mongo with bcrypt.
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    firstName,
    lastName,
    email
  });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  };
});

module.exports = signupRouter;

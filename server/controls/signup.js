const User = require('../models/user');
const signupRouter = require('express').Router();
const bcrypt = require('bcrypt');

signupRouter.post('/', async (req, res, next) => {
  const { username, password, firstName, lastName, email } = req.body;

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'Password or username must be greater than 3' });
  };

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

signupRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = signupRouter;

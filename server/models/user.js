const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    requried: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'invalid email']
  },
  status: {
    type: String,
    maxLength: 20,
    default: "I'm a new user"
  },
  isDarkMode: {
    type: Boolean,
    default: false
  },
  profileImage: {
    type: String
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);

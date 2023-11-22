const User = require('../models/user');

const initialUser = [
  {
    firstName: 'tester',
    lastName: 'tester',
    username: 'tester',
    password: 'secret',
    email: 'tester@gmail.com'
  }
];
const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
  ;
};

module.exports = {
  initialUser,
  usersInDb
};

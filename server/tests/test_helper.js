const User = require('../models/user');

const initialUser = [
  {
    firstName: 'tester',
    lastName: 'tester',
    username: 'tester',
    password: 'secret',
    email: 'tester@gmail.com'
  },
  {
    firstName: 'test1',
    lastName: 'test1',
    username: 'test1',
    password: 'secret',
    email: 'test1r@gmail.com'
  },
  {
    firstName: 'test2',
    lastName: 'test2',
    username: 'test2',
    password: 'secret',
    email: 'test2@gmail.com'
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

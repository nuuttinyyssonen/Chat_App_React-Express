const User = require('../models/user');
const app = require('../index');
const supertest = require('supertest');
const api = supertest(app);

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
};

const initializeTests = async () => {
  await User.deleteOne({ username: 'tester' });
  await User.deleteOne({ username: 'test1' });
  await User.deleteOne({ username: 'test2' });

  await api.post('/signup').send(initialUser[0]);
  await api.post('/signup').send(initialUser[1]);      
  await api.post('/signup').send(initialUser[2]);
  const user = initialUser[1];
  const response = await api.post('/login').send(user);
  let authHeader = `bearer ${response.body.token}`;
  return authHeader
}

module.exports = {
  initialUser,
  usersInDb,
  initializeTests
};

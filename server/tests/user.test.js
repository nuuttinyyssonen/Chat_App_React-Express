const { describe, test, expect, afterAll } = require('@jest/globals');
const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const { initialUser, usersInDb } = require('../tests/test_helper');
let authHeader;

// These tests test user routes.
describe('users api', () => {
  describe('user', () => {
    // User can be created with signup route and it's saved in mongodb.
    test('can signup', async () => {
      const users = await usersInDb();
      await api
        .post('/signup')
        .send(initialUser[0])
        .expect(200);
      const usersAfter = await usersInDb();
      expect(usersAfter).toHaveLength(users.length + 1);
    });

    // User that was created can be logged in to and the auhtorization token can be retrieved.
    test('can login', async () => {
      const user = {
        username: initialUser[0].username,
        password: initialUser[0].password
      };
      const response = await api
        .post('/login')
        .send(user)
        .expect(200);
      const token = response.body.token;
      expect(token).toBeDefined();
    });

    // Same user can be deleted and mongodb won't have that record anymore.
    test('user can be deleted', async () => {
      const response = await api.post('/login').send({ username: 'tester', password: 'secret' });
      authHeader = `bearer ${response.body.token}`;
      const users = await usersInDb();
      await api
        .delete('/user')
        .set('Authorization', authHeader)
        .expect(200);
      const updatedUsers = await usersInDb();
      expect(updatedUsers).toHaveLength(users.length - 1);
    });
  });
});

describe('Friends api', () => {
  /*
    Initializing 2 users to be ready for tests. Tests will succeed everytime 'cause
    users are deleted in setup so their friend lists does not contain any data.
  */
  test('setup', async () => {
    await User.deleteOne({ username: initialUser[1].username });
    await User.deleteOne({ username: initialUser[2].username });
    const firstUser = initialUser[1];
    const secondUser = initialUser[2];
    await api.post('/signup').send(firstUser);
    await api.post('/signup').send(secondUser);
    const response = await api.post('/login').send({ username: 'test1', password: 'secret' });
    authHeader = `bearer ${response.body.token}`;
  });

  describe('Friends', () => {
    // New friends are pushed in to users friend array.
    test('can add friends', async () => {
      const user = await User.findOne({ username: initialUser[1].username });
      const response = await api
        .put('/user/test2')
        .set('Authorization', authHeader)
        .expect(200);
      const friends = response.body.friends;
      expect(friends).toHaveLength(user.friends.length + 1);
    });

    // If same user is being added twice to users friends array, error is being thrown.
    test('fails when adding existing friend', async () => {
      await api
        .put('/user/test2')
        .set('Authorization', authHeader)
        .expect(400);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

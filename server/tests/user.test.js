const { describe, beforeEach, test, expect, afterAll } = require('@jest/globals');
const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const api = supertest(app);
const { initialUser, usersInDb } = require('../tests/test_helper');
let authHeader;

describe('users api', () => {
  beforeEach(async () => {
    await User.deleteOne({ username: 'tester' });
  });
  describe('user', () => {
    test('can signup', async () => {
      const users = await usersInDb();
      await api
        .post('/signup')
        .send(initialUser[0])
        .expect(200);
      const usersAfter = await usersInDb();
      expect(usersAfter).toHaveLength(users.length + 1);
    });
    test('can login', async () => {
      const user = {
        username: 'testuser',
        password: 'secret'
      };
      const response = await api
        .post('/login')
        .send(user)
        .expect(200);
      const token = response.body.token;
      expect(token).toBeDefined();
    });
  });
});

describe('Friends api', () => {
  beforeEach(async () => {
    const user = initialUser[0];
    await api.post('/signup').send(user);
    const response = await api.post('/login').send(user);
    authHeader = `bearer ${response.body.token}`
  });
  test('can add friends', async () => {
    const user = await User.findOne({ username: initialUser[0].username });
    const response = await api
      .put(`/user/testuser`)
      .set('Authorization', authHeader)
      .expect(200)
    const friends = response.body.friends;
    expect(friends).toHaveLength(user.friends.length + 1);
  });
  test('fails when adding existing friend', async () => {
    await api
      .put(`/user/testuser`)
      .set('Authorization', authHeader)
      .expect(400)
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

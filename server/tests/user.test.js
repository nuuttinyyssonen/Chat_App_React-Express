const { describe, beforeEach, test, expect, afterAll } = require('@jest/globals');
const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const api = supertest(app);
const { initialUser, usersInDb } = require('../tests/test_helper');

describe('users api', () => {
  beforeEach(async () => {
    await User.deleteOne({ username: 'tester' });
  });
  describe('user', () => {
    test('create user', async () => {
      const users = await usersInDb();
      await api
        .post('/signup')
        .send(initialUser[0])
        .expect(200);
      const usersAfter = await usersInDb();
      expect(usersAfter).toHaveLength(users.length + 1);
    });
    test('login user', async () => {
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

afterAll(async () => {
  await mongoose.connection.close();
});

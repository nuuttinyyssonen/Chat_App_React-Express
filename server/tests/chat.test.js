const { describe, beforeEach, test, expect, afterAll } = require('@jest/globals');
const User = require('../models/user');
const Chat = require('../models/chat');
const mongoose = require('mongoose');

const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const { initialUser, initializeTests } = require('../tests/test_helper');
const { io } = require('socket.io-client');

// Mock server to make tests to group chat name changing
const socket = io('http://localhost:5000');

let authHeader;
let chatId;

describe('Chat api', () => {
  beforeEach(async () => {
    // Gets token with function retreived from test_helper.js
    authHeader = await initializeTests();
  });

  describe('Chat', () => {
    // Chat records are created and users are saved in chat's users array.
    test('room can be created', async () => {
      const user = await User.findOne({ username: 'test2' });
      const username = user.username;
      const response = await api
        .put(`/user/${username}`)
        .set('Authorization', authHeader)
        .expect(200);
      chatId = response.body.chats[0];
      expect(response.body.chats).toHaveLength(user.chats.length + 1);
    });

    test('Group chats can be created', async () => {
      const users = [initialUser[0].username, initialUser[1].username, initialUser[2].username, initialUser[3].username];
      const response = await api
        .post('/chat/groupChat')
        .send(users)
        .set('Authorization', authHeader)
        .expect(200);
      chatId = response.body.chats[0]._id
      const chat = await Chat.findById(chatId)
      expect(chat).toBeDefined();
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

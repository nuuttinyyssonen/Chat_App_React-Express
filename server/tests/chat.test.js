const { describe, beforeEach, test, expect, afterAll } = require('@jest/globals');
const User = require('../models/user');
const Chat = require('../models/chat');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const api = supertest(app);
const { initialUser, usersInDb, initializeTests } = require('../tests/test_helper');

let authHeader;
let chatId;

describe('Chat api', () => {
    beforeEach(async () => {
      authHeader = await initializeTests();
    });

    describe('Chat', () => {
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
        const users = [initialUser[0].username, initialUser[1].username, initialUser[2].username];
        const response = await api
          .post('/chat/groupChat')
          .send(users)
          .set('Authorization', authHeader)
          .expect(200);
        chatId = response.body._id
      });

      test('Group chat name can be changed', async () => {
        const chat = await Chat.findById(chatId);
        const groupChatName = 'test'
        const response = await api
          .put(`/chat/${chat._id}`)
          .send(groupChatName)
          .expect(200);
        console.log(response.body);
        const updatedChat = await Chat.findById(chatId);
        expect(updatedChat.chatName).toBe('test');
      });

      test('Group chats can be deleted', async () => {
        const chat = await Chat.findById(chatId);
        const chats = await Chat.find({});
        const response = await api
          .delete(`/chat/${chat._id}`)
          .expect(200);
        const chatsUpdated = await Chat.find({});
        expect(chatsUpdated).toHaveLength(chats.length - 1);
      });
    });
});
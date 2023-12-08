const { describe, beforeEach, test, expect } = require('@jest/globals');
const User = require('../models/user');
const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const { initializeTests } = require('../tests/test_helper');
const { io } = require('socket.io-client');

// Mock server to make socket.io tests
const socket = io('http://localhost:5000');

let authHeader;
let chatId;
let messageId;

describe('Socket', () => {
  beforeEach(async () => {
    // Gets token with function retreived from test_helper.js
    authHeader = await initializeTests();
  });

  describe('Socket-io tests', () => {
    // Users are pushed and they appear in the Users Set which includes all online users
    test('user can appear online', async () => {
      const person = await User.findOne({ username: 'test2' });
      const username = person.username;
      const response = await api
        .put(`/user/${username}`)
        .set('Authorization', authHeader)
        .expect(200);
      chatId = response.body.chats[0];
      const user = await User.findOne({ username: 'test1' });
      // Promise that returns all online users from users Set.
      const loginPromise = new Promise((resolve) => {
        socket.on('online', (data) => {
          resolve(data);
        });
      });
      socket.emit('login', user._id);
      const onlineUserArray = await loginPromise;
      expect(onlineUserArray).toHaveLength(1);
    });

    // Users can join into room and the messages are only shown in the specifc room.
    test('room can be joined and message sent', async () => {
      const user = await User.findOne({ username: 'test1' });
      // Promise returns the joined room id.
      const joinRoomPromise = new Promise((resolve) => {
        socket.on('joinedRoom', (data) => {
          resolve(data);
        });
      });

      // Promise returns the emitted message to specific room.
      const receiveMessagePromise = new Promise((resolve) => {
        socket.on('receive_message', (data) => {
          resolve(data);
        });
      });

      socket.emit('joinRoom', chatId);
      socket.emit('message', { message: 'test', room: chatId, userId: user._id });
      await joinRoomPromise;
      const response = await receiveMessagePromise;
      messageId = response._id;
      const chat = await Chat.findById(chatId).populate('messages');
      expect(chat.messages[0].message).toBe('test');
    });

    // Message record is deleted and the id is deleted from chat record as well. 
    test('message can be deleted', async () => {
      const chat = await Chat.findById(chatId);
      const message = await ChatMessage.findById(messageId);
      await api
        .delete(`/chat/${chat._id}/message/${message._id}`)
        .expect(200);
      const updatedChat = await Chat.findById(chatId);
      expect(updatedChat.messages).toHaveLength(chat.messages.length - 1);
    });
  });
});

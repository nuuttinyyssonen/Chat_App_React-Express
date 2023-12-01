const { describe, beforeEach, test, expect, afterAll } = require('@jest/globals');
const User = require('../models/user');
const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const api = supertest(app);
const { initialUser, usersInDb } = require('../tests/test_helper');
const { io } = require('socket.io-client');

const socket = io('http://localhost:5000');

let authHeader;
let chatId;

describe('Chat api', () => {
    beforeEach(async () => {
      await User.deleteOne({ username: 'test1' });
      await User.deleteOne({ username: 'test2' });

      await api.post('/signup').send(initialUser[1]);      
      await api.post('/signup').send(initialUser[2])  
      const user = initialUser[1];
      const response = await api.post('/login').send(user);
      authHeader = `bearer ${response.body.token}`;
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

      test('user can appear online', async () => {
        const user = await User.findOne({ username: 'test1' })
        const loginPromise = new Promise((resolve) => {
          socket.on('online', (data) => {
            resolve(data);
          });
        });

        socket.emit('login', user._id);
        const onlineUserArray = await loginPromise;
        expect(onlineUserArray).toHaveLength(1);
      });

      test('room can be joined and message sent', async () => {
        const user = await User.findOne({ username: 'test1' });
        const joinRoomPromise = new Promise((resolve) => {
          socket.on('joinedRoom', (data) => {
            resolve(data);
          });
        });

        const receiveMessagePromise = new Promise((resolve) => {
          socket.on('receive_message', (data) => {
            resolve(data);
          });
        });

        socket.emit('joinRoom', chatId);
        socket.emit('message', { message: 'test', room: chatId, userId: user._id });
        await joinRoomPromise;
        await receiveMessagePromise;
        
        const chat = await Chat.findById(chatId).populate('messages');
        expect(chat.messages[0].message).toBe('test');
      });
    });
});
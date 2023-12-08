const { describe, beforeEach, test, expect } = require('@jest/globals');
const User = require('../models/user');
const Chat = require('../models/chat');
const ChatMessage = require('../models/chatMessage');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const { initializeTests } = require('../tests/test_helper');
const { io } = require('socket.io-client');

const socket = io('http://localhost:5000');

let authHeader;
let chatId;
let messageId;

describe('Socket', () => {
    beforeEach(async () => {
        authHeader = await initializeTests();
    });

    describe('Socket-io tests', () => {
        test('user can appear online', async () => {
            const person = await User.findOne({ username: 'test2' });
            const username = person.username;
            const response = await api
                .put(`/user/${username}`)
                .set('Authorization', authHeader)
                .expect(200);
            chatId = response.body.chats[0];
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
            const response = await receiveMessagePromise;
            messageId = response._id
            console.log(messageId)
            const chat = await Chat.findById(chatId).populate('messages');
            expect(chat.messages[0].message).toBe('test');
        });

        test('message can be deleted', async () => {
            const chat = await Chat.findById(chatId);
            const user = await User.findOne({ username: 'test1' });
            const message = await ChatMessage.findById(messageId);
            const response = await api
              .delete(`/chat/${chat._id}/message/${message._id}`)
              .expect(200);
            const updatedChat = await Chat.findById(chatId);
            expect(updatedChat.messages).toHaveLength(chat.messages.length - 1);
        });
    });
});
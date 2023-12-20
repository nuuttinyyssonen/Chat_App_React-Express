const { Server } = require('socket.io');
const { CLIENT_ORIGIN } = require('../utils/config');

const { handleDeleteMessage, handleDeleteImage } = require('./deleteHandlers');
const { handleSendMessage, handleTyping } = require('./messageHandlers');
const { handleGroupNameChange } = require('./groupHandlers');
const handleSendImage = require('./imageHandlers');

// Socket server configuration with CORS and allowed methods.
const io = new Server({
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST']
  }
});

// Online users are stored in users Set and on client side in redux.
const users = new Set();
io.on('connection', (socket) => {
  socket.on('login', (data) => {
    // Adds user to set and sends online users to client so redux is updated.
    users.add(data);
    io.emit('online', Array.from(users));
  });

  socket.on('joinRoom', (room) => {
    socket.join(room);
    socket.emit('joinedRoom', room);
  });

  // Sends messages real-time
  socket.on('message', (data) => handleSendMessage(io, data));

  // Sends typing indicator real-time
  socket.on('typing', (data) => handleTyping(io, data));

  // Sends images real-time
  socket.on('image', (data) => handleSendImage(io, data));

  // Deletes messages real-time
  socket.on('delete_message', (data) => handleDeleteMessage(io, data));

  // Deletes images real-time
  socket.on('delete_image', (data) => handleDeleteImage(io, data));

  // Updates group's name real-time
  socket.on('groupName', (data) => handleGroupNameChange(io, data));

  socket.on('logout', (data) => {
    // Deletes user from set and sends online users to client so redux is updated.
    users.delete(data);
    io.emit('online', Array.from(users));
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

module.exports = io;

const ChatMessage = require('../models/chatMessage');
const ChatImage = require('../models/chatImage');
const Chat = require('../models/chat');
const s3 = require('./aws');
const { v4: uuidv4 } = require('uuid');
const { Server } = require('socket.io');

// Socket server configuration with CORS and allowed methods.
const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
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

  socket.on('typing', (data) => {
    // Sends specific users a text if user is typing.
    const { room, typing } = data;
    if (typing === true) {
      io.in(room).emit('display', data);
    } else {
      io.in(room).emit('display', data);
    }
  });

  socket.on('image', async (data) => {
    const { buffer, room, userId, file } = data;
    const key = `${uuidv4()}-${file}`;
    // Promise which is meant to return images link in aws bucket.
    const s3UploadPromise = () => {
      return new Promise((resolve, reject) => {
        s3.upload(
          {
            Bucket: 'chatappimages20',
            Key: key,
            Body: buffer,
            ContentType: 'image/jpg'
          },
          (err, data) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(data.Location);
            }
          }
        );
      });
    };
    // New Image records are created and their ids are pushed into specific chat room.
    const imageUrl = await s3UploadPromise();
    const chatRoom = await Chat.findById(room);
    const chatImage = new ChatImage({
      dataUrl: imageUrl,
      user: userId,
      chat: room
    });
    const image = await chatImage.save();
    chatRoom.images.push(image._id);
    await chatRoom.save();
    const queriedImage = await ChatImage.findById(image._id).populate('user');
    // Images are being sent back to the client so the chat is updated in real-time.
    io.in(room).emit('receive_image', queriedImage);
  });

  socket.on('message', async (data) => {
    // New Message records are created and their ids are pushed into specific chat room.
    const { message, room, userId } = data;
    const chatRoom = await Chat.findById(room);
    const chatMessage = new ChatMessage({
      message,
      user: userId,
      chat: room
    });
    const msg = await chatMessage.save();
    chatRoom.messages.push(msg._id);
    await chatRoom.save();
    const queriedMessage = await ChatMessage.findById(msg._id).populate('user');
    // Messages are being sent back to client so the chat is updated in real-time.
    io.in(room).emit('receive_message', queriedMessage);
  });

  // Creates connection for video calls.
  socket.on('callUser', (data) => {
    console.log(data)
    io.emit('callUser', { signal: data.signalData });
  });

  socket.on('answerCall', (data) => {
    console.log(data)
    console.log(data.room)
    io.emit('callAccepted', data.signal);
  });

  socket.on('logout', (data) => {
    // Deletes user from set and sends online users to client so redux is updated.
    users.delete(data);
    io.emit('online', Array.from(users));
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

module.exports = io;

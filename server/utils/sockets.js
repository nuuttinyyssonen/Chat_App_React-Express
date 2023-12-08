const ChatMessage = require('../models/chatMessage');
const ChatImage = require('../models/chatImage');
const Chat = require('../models/chat');
const s3 = require('./aws');
const { v4: uuidv4 } = require('uuid');
const { Server } = require('socket.io');

const io = new Server({
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
});

const users = new Set();
io.on('connection', (socket) => {

  socket.on('login', (data) => {
    users.add(data);
    io.emit('online', Array.from(users));
  })

  socket.on('joinRoom', (room) => {
    socket.join(room);
    socket.emit('joinedRoom', room);
  });

  socket.on('typing', (data)=>{
    const { user, room, typing } = data;
    if(typing == true)
       io.in(room).emit('display', data)
    else
       io.in(room).emit('display', data)
  })

  socket.on('image', async (data) => {
    const { buffer, room, userId, file } = data;
    const key = `${uuidv4()}-${file}`;
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
    io.in(room).emit('receive_image', queriedImage);
  })

  socket.on('message', async (data) => {
    const { message, room, userId } = data;
    const chatRoom = await Chat.findById(room);
    const chatMessage = new ChatMessage({
      message: message,
      user: userId,
      chat: room
    })
    const msg = await chatMessage.save();
    chatRoom.messages.push(msg._id);
    await chatRoom.save();
    const queriedMessage = await ChatMessage.findById(msg._id).populate('user');
    io.in(room).emit('receive_message', queriedMessage);
  })

  socket.on('logout', (data) => {
    users.delete(data)
    io.emit('online', Array.from(users));
  })

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });  

  socket.on('disconnect', () => {
    console.log("disconnected")
  });
});

module.exports = io;
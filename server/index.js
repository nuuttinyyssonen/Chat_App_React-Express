const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URI, PORT, SECRET } = require('./utils/config');
const cors = require('cors');
const { errorHandler } = require('./utils/middleware');
const { Server } = require('socket.io');
const ChatMessage = require('./models/chatMessage');
const Chat = require('./models/chat');
const jwt = require('jsonwebtoken');

const signupRouter = require('./controls/signup');
const loginRouter = require('./controls/login');
const usersRouter = require('./controls/users');
const userRouter = require('./controls/user');
const friendsRouter = require('./controls/friends');
const resetCypressRouter = require('./controls/resetCypress');
const chatRouter = require('./controls/chat');

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  };
};
connectToMongoDB();

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/friends', friendsRouter);
app.use('/resetCypress', resetCypressRouter);
app.use('/chat', chatRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

const io = new Server(server, {
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
    console.log(`joined room: ${room}`);
    socket.emit('joinedRoom', room);
  });

  socket.on('typing', (data)=>{
    if(data.typing==true)
       io.emit('display', data)
    else
       io.emit('display', data)
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
    console.log(`message ${message} to ${room}`);
    io.in(room).emit('receive_message', data);
  })

  socket.on('logout', (data) => {
    console.log("logout", data);
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
module.exports = app;

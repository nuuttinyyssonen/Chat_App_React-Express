const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./utils/config');
const cors = require('cors');
const { errorHandler } = require('./utils/middleware');
const { Server } = require('socket.io');

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

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`joined room: ${room}`);
  });

  socket.on('message', (data) => {
    const { message, room } = data;
    console.log(`message ${message} to ${room}`);
    io.in(room).emit('receive_message', data);
    // socket.emit('receive_message', data);
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});
module.exports = app;

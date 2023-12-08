const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const cors = require('cors');
const { errorHandler } = require('./utils/middleware');
const s3 = require('./utils/aws');

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

s3.listObjects({ Bucket: 'chatappimages20' }, (err, data) => {
    if (err) {
      console.error('Error listing objects in S3 bucket:', err);
    } else {
      console.log('Connected to S3 bucket', data.Name)
    }
});

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/friends', friendsRouter);
app.use('/resetCypress', resetCypressRouter);
app.use('/chat', chatRouter);

app.use(errorHandler);

module.exports = app;
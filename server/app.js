const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const cors = require('cors');
const { errorHandler, unknownEndpoint } = require('./utils/middleware');
const s3 = require('./utils/aws');

const signupRouter = require('./controls/signup');
const loginRouter = require('./controls/login');
const usersRouter = require('./controls/users');
const userRouter = require('./controls/user');
const friendsRouter = require('./controls/friends');
const resetCypressRouter = require('./controls/resetCypress');
const chatRouter = require('./controls/chat');
const passwordResetRouter = require('./controls/passwordReset');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

mongoose.set('strictQuery', false);

// connection to mongodb
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  };
};
connectToMongoDB();

// connection to AWS bucket
s3.listObjects({ Bucket: 'chatappimages20' }, (err, data) => {
  if (err) {
    console.error('Error listing objects in S3 bucket:', err);
  } else {
    console.log('Connected to S3 bucket', data.Name);
  }
});

// Routes
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/user', userRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/resetCypress', resetCypressRouter);
app.use('/api/chat', chatRouter);
app.use('/api/passwordReset', passwordResetRouter);

// Fixes routing issues.
app.get('*', (res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

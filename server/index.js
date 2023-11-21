const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./utils/config');

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

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

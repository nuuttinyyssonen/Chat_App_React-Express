require('dotenv').config();
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET
};

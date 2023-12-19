require('dotenv').config();
// All environment variables from .env is imported/exported here.
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  AWS_KEY: process.env.ACCESSKEY,
  AWS_KEY_ID: process.env.ACCESSKEYID,
  AWS_REGION: process.env.REGION,
  MAIL_USER: process.env.USER_MAIL,
  MAIL_PASS: process.env.PASS_MAIL,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN
};

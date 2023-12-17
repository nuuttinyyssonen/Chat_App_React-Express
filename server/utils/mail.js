const { MAIL_USER, MAIL_PASS } = require('./config');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

module.exports = { transport };

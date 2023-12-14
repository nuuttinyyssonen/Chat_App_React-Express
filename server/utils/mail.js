const { MAIL_USER, MAIL_PASS } = require('./config');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

module.exports = { transport };

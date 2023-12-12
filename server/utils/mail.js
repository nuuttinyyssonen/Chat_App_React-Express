const { MAIL_USER, MAIL_PASS } = require('./config');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
    }
});

const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Test Email',
        link: 'https://mailgen.js/'
    }
});

module.exports = { MailGenerator, transport };
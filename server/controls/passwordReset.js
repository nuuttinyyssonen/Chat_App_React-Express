const User = require('../models/user');
const passwordResetRouter = require('express').Router();
const { transport } = require('../utils/mail');
const { EMAIL, SECRET } = require('../utils/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

passwordResetRouter.post('/', async (req, res) => {
  const { emailAddress } = req.body;
  const user = await User.findOne({ email: emailAddress });
  if (!user) {
    return res.status(404).send('Invalid email address!');
  }
  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });
  const emailBody = `
    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style="text-align: center;">
        <tr>
            <td>
                <p>Here is your password reset link:</p>
                <a href="https://chat-app-kufo.onrender.com/reset-password/${token}">Reset your password</a>
            </td>
        </tr>
    </table>`;

  const mailOptions = {
    from: EMAIL,
    to: emailAddress,
    subject: 'Password Reset',
    html: emailBody
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error sending email');
    } else {
      res.send('Email sent successfully!');
    }
  });
});

passwordResetRouter.post('/:token', async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send('user with token was not found!');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    user.passwordHash = passwordHash;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).send('Token has been expired');
  }
});

module.exports = passwordResetRouter;

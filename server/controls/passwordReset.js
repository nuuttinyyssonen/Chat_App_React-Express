const User = require('../models/user');
const passwordResetRouter = require('express').Router();
const { transport, MailGenerator } = require('../utils/mail');
const { EMAIL, SECRET } = require('../utils/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

passwordResetRouter.post('/', async (req, res, next) => {
    const { emailAddress } = req.body;
    console.log(emailAddress)
    const user = await User.findOne({ email: emailAddress })
    if(!user) {
        return res.status(404).send("user was not found!");
    }
    const token = jwt.sign({userId: user._id}, SECRET, { expiresIn: '1h' });
    const email = {
        body: {
            intro: 'Here is your password reset link',
            outro: `http://localhost:3000/reset-password/${token}`
        }
    }
    const emailBody = MailGenerator.generate(email);

    const mailOptions = {
        from: EMAIL,
        to: emailAddress,
        subject: 'test',
        html: emailBody
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully!');
        }
    });
});

passwordResetRouter.post('/:token', async (req, res) => {
    const token = req.params.token;
    const { password } = req.body
    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findById(decoded.userId);
        if(!user) {
            return res.status(404).send("user with token was not found!")
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds);
        console.log("this", password);
        user.passwordHash = passwordHash;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch(error) {
        return res.status(400).send("Token has been expired");
    }
});

module.exports = passwordResetRouter;
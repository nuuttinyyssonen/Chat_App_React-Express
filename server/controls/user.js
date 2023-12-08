const userRouter = require('express').Router();
const User = require('../models/user');
const Chat = require('../models/chat');
const { tokenExtractor } = require('../utils/middleware');
const upload = require('../utils/multer');
const s3 = require('../utils/aws');
const { v4: uuidv4 } = require('uuid');

// Gets one user by username
userRouter.get('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    return res.status(404).json({ error: 'user was not found!' });
  }
  res.status(200).json(user);
});

// Gets one user by id
userRouter.get('/id/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'user was not found!' });
  }
  res.status(200).json(user);
});

// Gets current user based on the authorization token. Token is retrieved with middleware function.
// Current user is queried with the token.
userRouter.get('/', tokenExtractor, async (req, res) => {
  const user = await User.findById(req.decodedToken.id)
    .populate([
      {
        path: 'chats',
        populate: [
          {
            path: 'messages',
            model: 'ChatMessage'
          },
          {
            path: 'users',
            model: 'User'
          }
        ]
      },
      {
        path: 'friends'
      }
    ]);
  if (!user) {
    res.status(404).json({ error: 'User was not found!' });
  }
  res.status(200).json(user);
});

// Deletes authenticated user based on the token. User is queried with the token.
userRouter.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.decodedToken.id);
    res.status(200).send('User was successfully deleted');
  } catch (error) {
    next(error);
  }
});

// Adds other users to current users friend list.
userRouter.put('/:username', tokenExtractor, async (req, res, next) => {
  const userToAdd = await User.findOne({ username: req.params.username });
  const user = await User.findById(req.decodedToken.id);
  // Error is thrown if user is already in friends array.
  if (user.friends.includes(userToAdd._id)) {
    return res.status(400).json({ error: 'This user is already in your friends' });
  }
  const chat = new Chat({
    users: [
      user._id,
      userToAdd._id
    ]
  });
  // Both user ids are being to pushed to each others friends array.
  try {
    const savedChat = await chat.save();
    user.chats.push(savedChat._id);
    user.friends.push(userToAdd._id);
    userToAdd.chats.push(savedChat._id);
    userToAdd.friends.push(user._id);
    await user.save();
    await userToAdd.save();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

// Profile pictures are uploaded via this and they are stored in AWS Bucket.
// Multer is used in here to handle the images.
userRouter.put('/upload/image', upload.single('file'), tokenExtractor, async (req, res, next) => {
  const { originalname, buffer } = req.file;
  const key = `${uuidv4()}-${originalname}`;
  const user = await User.findById(req.decodedToken.id);
  // Returns a promise which contains the link to image in AWS Bucket.
  const s3UploadPromise = () => {
    return new Promise((resolve, reject) => {
      s3.upload(
        {
          Bucket: 'chatappimages20',
          Key: key,
          Body: buffer,
          ContentType: 'image/jpg'
        },
        (err, data) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(data.Location);
          }
        }
      );
    });
  };
  // Images link is stored in mongodb.
  const imageUrl = await s3UploadPromise();
  user.profileImage = imageUrl;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

// Reusable route that can handle user's username, email, status and name modifications.
userRouter.put('/update/:field', tokenExtractor, async (req, res, next) => {
  const fieldToUpdate = req.params.field;
  const user = await User.findById(req.decodedToken.id);

  if (!user) {
    return res.status(404).send({ error: 'User was not found!' });
  }
  if (!user[fieldToUpdate]) {
    return res.status(404).send({ error: 'User does not have this field!' });
  }

  try {
    user[fieldToUpdate] = req.body[fieldToUpdate];
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

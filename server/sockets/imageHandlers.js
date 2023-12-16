const ChatImage = require('../models/chatImage');
const Chat = require('../models/chat');
const s3 = require('../utils/aws');
const { v4: uuidv4 } = require('uuid');

const handleSendImage = async (io, data) => {
  const { buffer, room, userId, file } = data;
  const key = `${uuidv4()}-${file}`;
  // Promise which is meant to return images link in aws bucket.
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
  // New Image records are created and their ids are pushed into specific chat room.
  try {
    const imageUrl = await s3UploadPromise();
    const chatRoom = await Chat.findById(room);
    if (!chatRoom) {
      return io.in(room).emit('error', 'This chat does not exist anymore!');
    }
    if (!imageUrl) {
      return io.in(room).emit('error', 'There was an error uploading image!');
    }

    const chatImage = new ChatImage({
      dataUrl: imageUrl,
      user: userId,
      chat: room
    });
    const image = await chatImage.save();
    chatRoom.images.push(image._id);
    await chatRoom.save();
    const queriedImage = await ChatImage.findById(image._id).populate('user');
    // Images are being sent back to the client so the chat is updated in real-time.
    io.in(room).emit('receive_image', queriedImage);
  } catch (error) {
    io.in(room).emit('error', error);
  }
};

module.exports = handleSendImage;

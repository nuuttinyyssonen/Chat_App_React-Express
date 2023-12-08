const multer = require('multer');

// Multer is for uploading single images. It's used image routes.
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;

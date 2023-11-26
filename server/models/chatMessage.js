const mongoose = require('mongoose');

const chatMessageSchema = mongoose.Schema({
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('chatMessage', chatMessageSchema);

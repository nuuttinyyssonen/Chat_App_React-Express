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
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);

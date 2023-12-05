const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatMessage'
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    chatName: {
        type: String,
        default: 'New Group Chat'
    }
});

module.exports = mongoose.model('Chat', chatSchema);

const mongoose = require('mongoose');

const chatImageSchema = mongoose.Schema({
    dataUrl: {
        type: String,
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

module.exports = mongoose.model('ChatImage', chatImageSchema)
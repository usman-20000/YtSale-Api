const mongoose = require('mongoose');

const chatScheme = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatScheme);

module.exports = Chat;

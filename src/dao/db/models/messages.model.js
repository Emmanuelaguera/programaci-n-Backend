const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
});

const Games = mongoose.model('Messages', messageSchema)
module.exports = Games
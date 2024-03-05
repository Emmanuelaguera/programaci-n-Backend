const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    mensaje: {
        user: String,
        message: String,

    }
});

const Games = mongoose.model('Games', messageSchema)
module.exports = Games
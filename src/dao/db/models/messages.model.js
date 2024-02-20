const mongoose = require('mongoose');

const GamesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
})

const Games = mongoose.model('Games', GamesSchema)
module.exports = Games
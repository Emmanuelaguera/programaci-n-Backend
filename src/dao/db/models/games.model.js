const mongoose = require('mongoose');

const GamesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true,
        enum: ['supervivencia', 'aventura', 'acción']
    },
    stock: {
        type: Number,
        default: 9
    }
})

const Games = mongoose.model('Games', GamesSchema)
module.exports = Games
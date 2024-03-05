const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['supervivencia', 'aventura', 'acción']
    },
    stock: {
        type: Number,
        default: 9
    }
})

const Games = mongoose.model('Games', cartsSchema)
module.exports = Games
const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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

const Products = mongoose.model("Products", ProductsSchema)
module.exports = Products;
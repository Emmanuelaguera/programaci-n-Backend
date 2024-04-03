const mongoose = require('mongoose');
const Products = require("./products.model")

const cartsSchema = new mongoose.Schema({
    products: [Products.Schema]
})

const Carts = mongoose.model("Carts", cartsSchema)
module.exports = Carts;
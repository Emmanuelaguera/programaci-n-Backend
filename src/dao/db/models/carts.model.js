const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'aca van los productos'
    }]
});

const Carts = mongoose.model("Carts", cartsSchema)
module.exports = Carts;
const express = require("express");

const { Router } = express;
const router = new Router();

// const CartManager = require("../dao/fileSystem/cartManager");
// const cartManager = new CartManager("../dao/db/models/carts.model");
const cartsController = require("../controllers/cartsController");

router.post("/carts", cartsController.createCart);
router.get("/carts/:cid", cartsController.getCart);
router.post("/carts/:cid/products/:pid", cartsController.addProductToCart);
router.delete("/carts/:cid/products/:pid", cartsController.removeProductFromCart);

module.exports = router;

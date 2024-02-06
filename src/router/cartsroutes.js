const express = require("express");
const uuid4 = require("uuid4");

const { Router } = express;
const router = new Router();

const CartManager = require("../dao/managers/cartManager");
const cartManager = new CartManager("./src/cart.json");

router.post("/cart", async (req, res) => {
    try {
        const response = await cartManager.newCart();
        return res.json(response);
    } catch (error) {
        console.log(error);
        res.send("Error al crear carrito");
    }
});

router.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const response = await cartManager.getCartProducts(cid);
        res.json(response);
    } catch (error) {
        res.send("Error al enviar los productos");
    }
});

router.post("/cart/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProductCart(cid, pid);
        res.send("Producto agregado");
    } catch (error) {
        res.send("Error al guardar producto");
    }
});

module.exports = router;
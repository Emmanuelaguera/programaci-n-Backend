const express = require("express");
const { Router } = express;
const router = new Router();

// const ProductManager = require("../dao/fileSystem/productsManager");
// const productManager = new ProductManager("./src/games.json"); 
const productsController = require("../controllers/productsController");

router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProduct);
router.post("/products", productsController.createProduct);
router.put("/products/:id", productsController.updateProduct);
router.delete("/products/:id", productsController.deleteProduct);

module.exports = router;

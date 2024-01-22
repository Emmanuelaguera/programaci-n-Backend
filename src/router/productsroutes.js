const express = require("express");
const { Router } = express;
const router = new Router();

const ProductManager = require("../productsManager");
const productManager = new ProductManager("./src/games.json"); 

router.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit); 
    return res.json(products);
  } catch (error) {
    console.log(error);
    res.send("Error al recibir los productos");
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productManager.getProductById(pid);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.send("Error al recibir el productos");
  }
});

router.post("/products", async (req, res) => {
  try {
    const { name, price, code, stock, description, thumbnail } = req.body; 
    const response = await productManager.addProduct({name,price,code,stock,description,thumbnail,});
    res.json(response);
  } catch (error) {
    console.log(error);
    res.send("Error al intentar agregar productos");
  }
});

router.put("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const { name, price, code, stock, description, thumpnail } = req.body;
    const response = await productManager.updateProduct(pid, {name,price,code,stock,description,thumpnail,});
    res.json(response);
  } catch (error) {
    console.log(error);
    res.send(`Error al intentar editar productos con id ${pid}`);
  }
});

router.delete("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await productManager.deleteProduct(pid);
    res.send("Producto eliminado");
  } catch (error) {
    console.log(error);
    res.send(`Error al intentar eliminar productos con id ${pid}`);
  }
});

module.exports = router;
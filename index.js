const express = require('express');
const ProductManager = require('./productsFile');

const app = express();
const product = new ProductManager("./games.json");

app.get('/', (req, res) => {
    res.send('Bienvenidos a Sector Games Tandil');
});

app.get('/allProducts', async (req, res) => {
    let response = await product.getProducts()
    console.log(response)
    res.send(response);
});

app.get('/producById', async (req, res) => {
    let response = await product. getProductById(2)
    res.send(response);
});

app.listen(8080, () => {
    console.log('Server run on port 8080');
});


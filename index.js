const express = require('express');
const ProductManager = require('./productsFile');

const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenidos a Sector Games Tandil');
});

app.get('allProducts', async (req, res) => {
    let response = await product.ProductManager();
    res.send(response);
});

app.listen(8080, () => {
    console.log('Server run on port 8080');
});

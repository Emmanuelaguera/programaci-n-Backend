const express = require('express');
const ProductManager = require('./productsFile');
const uuid4 = require('uuid4')
const ProductsRoutes = require ('./router/productsroutes')
const cartRoutes = require ('./router/cartsroutes')

const app = express();
const productManager = new ProductManager("./src/games.json");
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bienvenidos a Sector Games Tandil');
});

//Todos los productos.
app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const response = await productManager.getProducts(limit);
    res.send(response);
});

//Un solo producto.
app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const response = await productManager.getProductById(productId);
    res.send(response)
});

app.listen(8080, () => {
    console.log('Server run on port 8080');
});


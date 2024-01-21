const express = require('express');
const ProductManager = require('./productsFile');
const CartManager = require('./productsFile');
const ProductsRoutes = require('./router/productsroutes')
const cartRoutes = require('./router/cartsroutes')

const app = express();
const productManager = new ProductManager("./src/games.json");
const cartManager = new CartManager("./src/cart.json");
app.use(express.json())
app.use('api/products', ProductsRoutes)
app.use('api/cart', cartRoutes)

app.get('/', (req, res) => {
    res.send('Bienvenidos a Sector Games Tandil');
});

// //Todos los productos.
app.get('api/products', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const response = await productManager.getProducts(limit);
    res.send(response);
});

// //Un solo producto.
app.get('api/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const response = await productManager.getProductById(productId);
    res.send(response)
});

app.listen(8080, () => {
    console.log('Server run on port 8080');
});


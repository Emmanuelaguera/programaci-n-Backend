const express = require("express");
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const Database = require ('./dao/db/index')



const productsRoutes = require("./router/productsRoutes");
const cartRoutes = require("./router/cartsRoutes");
const gamesRoutes = require("./router/gamesRoutes");

const ProductManager = require("./dao/fileSystem/productsManager");
const productManager = new ProductManager("./src/games.json");

const app = express();
const PORT = 8080 || process.env.PORT

// SERVER HTTP  
const server = http.createServer(app)

//PUBLIC
app.use(express.static(__dirname + "/public"))

//ENGINE
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use(express.json());
//ROUTES
app.use("/api", productsRoutes);
app.use("/api", cartRoutes);
app.use("/api",gamesRoutes);

app.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {
        products
    });
});

app.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {
        products
    });
});

//SOCKET SERVER
const io = new Server(server)
io.on('connection', (socket) => {
    console.log('Hola nuevo cliente')
    socket.emit('wellcome', 'Bienvenido cliente nuevo')
    socket.on('new-product', async (newProduct) => {

        console.log('Nuevo producto para agregar', newProduct);
        await productManager.addProduct(newProduct);
        socket.emit('update-products', await productManager.getProducts());

    });
})

server.listen(PORT, () => {
    console.log("Server run on port 8080");
    Database.connect()
});


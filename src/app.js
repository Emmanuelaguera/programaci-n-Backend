const express = require("express");
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const Database = require('./dao/db/index')

const Messages = require('./dao/db/models/messages.model');

const productsRoutes = require("./router/productsRoutes");
const cartRoutes = require("./router/cartsRoutes");
const gamesRoutes = require("./router/gamesRoutes");
const messageRoutes= require("./router/gamesRoutes");

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
app.use("/api", gamesRoutes);
app.use("/api", messageRoutes);

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

app.get("/chat", async (req, res) => {
    res.render('chat');
});

//SOCKET SERVER
const io = new Server(server)
io.on('connection', async (socket) => {
    console.log('Hola nuevo cliente')
    socket.emit('wellcome', 'Bienvenido cliente nuevo')
    socket.on('new-product', async (newProduct) => {

        console.log('Nuevo producto para agregar', newProduct);
        await productManager.addProduct(newProduct);
        io.emit('update-products', await productManager.getProducts());

    });

    // Emitir todos los mensajes la primera vez que se carga la App
    const msg = await Messages.find();
    io.emit('update-messages', msg);

    socket.on('new-message', async (newMessage) => {
        // Primero guardo el mensage en Mongo
        await Messages.create(newMessage);
        const msg = await Messages.find();
        // Segundo: emito un nuevo evento porque hay un nuevo mensaje
        io.emit('update-messages', msg);
    });
})

server.listen(PORT, () => {
    console.log("Server run on port 8080");
    Database.connect()
});

module.exports = app
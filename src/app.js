const express = require("express");
const handlebars = require('express-handlebars')

const productsRoutes = require("./router/productsroutes");
const cartRoutes = require("./router/cartsroutes");

const app = express();
const PORT = 8080 || process.env.PORT

//PUBLIC
app.use(express.static(__dirname+"/public"))

//ENGINE
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

app.use(express.json());
//ROUTES
app.use("/api", productsRoutes);
app.use("/api", cartRoutes);

app.get("/", (req, res) => {
    res.render("home", {});
});

app.listen(PORT, () => {
    console.log("Server run on port 8080");
});


const express = require("express");

const productsRoutes = require("./router/productsroutes");
const cartRoutes = require("./router/cartsroutes");

const app = express();

app.use(express.json());

app.use("/api", productsRoutes);
app.use("/api", cartRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenidos a Sector Games Tandil");
});

app.listen(8080, () => {
    console.log("Server run on port 8080");
});


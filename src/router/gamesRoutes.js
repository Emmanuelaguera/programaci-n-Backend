const express = require("express");

const { Router } = express
const Games = require('../dao/db/models/games.model')
const route = new Router

route.get('/addProduct', async (req, res) => {
    try {
        let resp = await Games.find()
        res.send({
            msg: 'Juegos encontrados',
            data: resp
        })
    } catch (error) {
        console.log(error)
    }
})

route.post('/updateProduct', async (req, res) => {
    try {
        await Games.create(req.body)
        res.status(201).send({
            msg: 'Juego creado',
            data: req.body
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = route
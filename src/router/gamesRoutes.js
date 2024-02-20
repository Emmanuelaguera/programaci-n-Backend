const express = require("express");

const { Router } = express
const Games = require('../dao/db/models/games.model')
const route = new Router

route.get('/games', async (req, res) => {
    try {
        const resp = await Games.find()
        res.send({
            msg: 'Juegos encontrados',
            data: resp
        })
    } catch (error) {
        console.log(error)
    }
})

route.post('/games', async (req, res) => {
    try {
        await Games.create(req.body)
        res.status(201).send({
            msg: 'Juegos creados',
            data: req.body
        })
    } catch (error) {
        console.log(error)
    }
})

route.put('/games', async (req, res) => {
    try {
        const resp = await Games.find()
        res.send({
            msg: 'Juegos actualizados',
            data: resp
        })
    } catch (error) {
        console.log(error)
    }
})

route.delete('/games', async (req, res) => {
    try {
        const resp = await Games.deleteOne()
        res.send({
            msg: 'Juegos eliminados',
            data: resp
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = route
const express = require("express");

const { Router } = express
const messages = require('../dao/db/models/messages.model')
const route = new Router

route.get('/', (req, res) => {
    res.render('chat', {})
})



module.exports = route
const express = require("express");

const { Router } = express;
const Messages = require('../dao/db/models/messages.model');
const route = new Router();

route.get('/messages', async (req, res) => {
    try {
        const msg = await Messages.find();
        res.send(msg);
    } catch (error) {
        console.log(error);
    }
});

module.exports = route;
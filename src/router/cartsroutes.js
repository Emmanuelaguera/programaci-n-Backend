const express = require('express');
const uuid4 = require('uuid4')

const { Router } = express
const router = new Router()

router.post('/api/cart', async (req, res) => {
    try {
        const response = await cartManager.newCart()
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('Error al crear carrito')
    }
})

router.get('/api/cart:cid', async (req, res) => {
    const { cid } = res.params;
    try {
        const response = await cartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send('Error al enviar los productos')
    }
})

router.post('/:cid/cart/:pid', async (req, res) =>{
    const {cid, pid } = req.params;
    try {
        await cartManager.addProductCart(cid, pid)
        res.send('Producto agregado')
    } catch (error) {
        res.send ('Error al guardar producto')
        
    }
})


module.exports = router 
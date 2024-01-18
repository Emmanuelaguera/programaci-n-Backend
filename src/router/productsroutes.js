const express = require('express');

const {Router} = express
const router = new Router ()

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = ProductManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, limit)
            return res.json(products)
        }
    } catch (error) {
        console.log(error);
        res.send('Error al recibir los productos')
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const products = ProductManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send('Error al recibir el productos')
    }
})
router.post('/', async (req, res) => {
    try {
        const { name, price, code, stock, description, thumpnail } = req.body;
        const response = await ProductManager.addProduct({ name, price, code, stock, description, thumpnail })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('Error al intentar agregar productos')

    }
})
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const { name, price, code, stock, description, thumpnail } = req.body;
        const response = await ProductManager.updateProduct(id, { name, price, code, stock, description, thumpnail })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar editar productos con id ${pid}`)
    }
})
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await ProductManager.deleteProduct(id)
        res.send('Producto eliminado')
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar eliminar productos con id ${pid}`)
    }
})


module.exports = router 
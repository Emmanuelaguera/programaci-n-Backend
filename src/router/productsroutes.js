const express = require('express');
const uuid4 = require('uuid4')

const {Router} = express
const router = new Router ()

let pid = uuid4 ()

router.get('api/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await ProductManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, limit)
            return res.json(products)
        }
    } catch (error) {
        console.log(error);
        res.send('Error al recibir los productos')
    }
})

router.get('api/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const products = await ProductManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send('Error al recibir el productos')
    }
})
router.post('api/products', async (req, res) => {
    try {
        const { name, price, code, stock, description, thumpnail } = req.body;
        const response = await ProductManager.addProduct({ name, price, code, stock, description, thumpnail })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('Error al intentar agregar productos')

    }
})
router.put('api/products:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const { name, price, code, stock, description, thumpnail } = req.body;
        const response = await ProductManager.updateProduct(pid, { name, price, code, stock, description, thumpnail })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar editar productos con id ${pid}`)
    }
})
router.delete('api/products:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await ProductManager.deleteProduct(pid)
        res.send('Producto eliminado')
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar eliminar productos con id ${pid}`)
    }
})


module.exports = router 
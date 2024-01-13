const fs = require('fs');
const filePath = './games.json';

class ProductManager {

    constructor(path) {
        this.products = [];
        this.id = 0;
        this.path = path;
    }

    saveToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    async loadFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('ERROR', error);
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error(`NOT FOUND`);
            return;
        }
        this.products.splice(index, 1);
        this.saveToFile();
        console.log(`PRODUCTO ELIMINADO`);
    }
    updateProduct(id, updatedFields) {
        let products = this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log('NOT FOUND');
            return;
        }

        if ('id' in updatedFields) {
            console.log('EL ID NO SE PUEDE CAMBIAR');
            return;
        }
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        this.saveToFile();
        return products[productIndex];
    }

    async getProducts() {
        return await this.loadFromFile();
    }

    getProductById(id) {
        this.loadFromFile();
        const product = this.products.find(product => product.id === id);
        if (!product) {
            return "Not Found";
        }
        return product;
    }
    addProduct(name, price, code, stock, description, thumpnail) {
        if (!name || !price || !code || !stock || !description || !thumpnail) {
            console.log("Validar Todos los campos");
        }

        if (!this.products.some((p) => p.code === code)) {
            this.id++;
            const newProduct = { name, price, code, stock, description, thumpnail, id: this.id };

            this.products.push(newProduct);
            this.saveToFile();
            console.log(`El producto ${name} se agreago correctamente`);
        } else {
            console.log(`Ya existe el producto con el codigo ${code}`);
        }
    }

}

// module.exports = new ProductManager(filePath);

// ProductManager.addProduct("The Last Of Us", 1200, 584, 8);
// ProductManager.addProduct("Uncharted 4", 4100, 321, 5);
// ProductManager.addProduct("Wolfenstein THE NEW ORDER", 2100, 654, 6);

// ProductManager.addProduct("The Last Of As", 1200, 584, 8);

// console.log('*****PRODUCTS******');
// console.log(ProductManager.getProducts());

// console.log('*****PRODUCT BY ID******');
// console.log(ProductManager.getProductById(2))

// console.log('*****PRODUCT CLEAR******');
// console.log(ProductManager.deleteProduct(3))

// console.log('*****PRODUCT UPDATEPRODUCT******');
// console.log(ProductManager.updatedFields)

module.exports = ProductManager







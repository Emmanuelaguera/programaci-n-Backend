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

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
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

    getProducts() {
        this.loadFromFile();
        return this.products;
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

const productManager = new ProductManager(filePath);

productManager.addProduct("The Last Of Us", 1200, 584, 8);
productManager.addProduct("Uncharted 4", 4100, 321, 5);
productManager.addProduct("Wolfenstein THE NEW ORDER", 2100, 654, 6);

productManager.addProduct("The Last Of As", 1200, 584, 8);

console.log('*****PRODUCTS******');
console.log(productManager.getProducts());

console.log('*****PRODUCT BY ID******');
console.log(productManager.getProductById(2))

console.log('*****PRODUCT CLEAR******');
console.log(productManager.deleteProduct(3))







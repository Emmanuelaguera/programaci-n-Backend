const fs = require("fs");
const uuid4 = require("uuid4");

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    saveToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    async loadFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, "utf8");
            return JSON.parse(data);
        } catch (error) {
            console.error("ERROR", error);
        }
    }

    async deleteProduct(id) {
        this.products = await this.getProducts();
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            console.error(`NOT FOUND`);
            return;
        }
        this.products.splice(index, 1);
        this.saveToFile();
        console.log(`PRODUCTO ELIMINADO`);
    }

    async updateProduct(id, updatedFields) {
        let products = await this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log("NOT FOUND");
            return;
        }

        if ("id" in updatedFields) {
            console.log("EL ID NO SE PUEDE CAMBIAR");
            return;
        }
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        this.products = products;
        this.saveToFile();
        return products[productIndex];
    }

    async getProducts(limit) {
        const products = await this.loadFromFile();
        if (limit) {
            return products.slice(0, limit);
        } else {
            return products;
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (!product) {
            return "Not Found";
        }
        return product;
    }

    async addProduct({ name, price, code, stock, description, thumbnail }) {
        if (!name || !price || !code || !stock || !description || !thumbnail) {
            console.log("Validar Todos los campos");
        }
        this.products = await this.getProducts();
        if (!this.products.some((p) => p.code === code)) {
            const newProduct = { name, price, code, stock, description, thumbnail, id: uuid4(), };
            this.products.push(newProduct);
            this.saveToFile();
            console.log(`El producto ${name} se agreago correctamente`);
        } else {
            console.log(`Ya existe el producto con el codigo ${code}`);
        }
    }
}

module.exports = ProductManager;





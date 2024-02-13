const Games = require('./models/games.model')

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async loadFromFile() {
       
    }

    async deleteProduct(id) {
     try {
      
     } catch (error) {
      
     }
    }

    async updateProduct(id, updatedFields) {
       try {
        
       } catch (error) {
        
       }
    }

    async getProducts(limit) {
      try {
        
      } catch (error) {
        
      }
    }

    async getProductById(id) {
     try {
      
     } catch (error) {
      
     }
    }

    async addProduct({ name, price, stock,category, }) {
      try {
        console.log({ name, price, stock,category })
        await Games.create({ name, price, stock,category })
        return ('producto guardado')
      } catch (error) {
        console.log(error)
        return(error)
      }
    }
}

module.exports = ProductManager;
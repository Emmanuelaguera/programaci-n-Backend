class ProductManager {

  constructor() {
    this.products = [];
    this.id = 0;
    this.Path = './test.json';
  }

  getProducts() {
    return this.products;
  }
  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      return "Not Found";
    }
    return product;
  }
  addProduct(name, price, code, stock) {
    if (!name || !price || !code || !stock) {
      console.log("Validar Todos los campos");
    }

    if (!this.products.some((p) => p.code === code)) {
      this.id++;
      const newProduct = { name, price, code, stock, id: this.id };

      this.products.push(newProduct);
      console.log(`El producto ${name} se agreago correctamente`);
    } else {
      console.log(`Ya existe el producto con el codigo ${code}`);
    }
  }

  getProductByCode(code) {

    const product = this.products.find((p) => p.code === code);

    if (product == undefined) {
      console.log(`No existe ningun producto con el codigo ${code}`);
    } else {
      console.log(product);
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct("The Last Of Us", 1200, 584, 8);
productManager.addProduct("Uncharted 4", 4100, 321, 5);
productManager.addProduct("Wolfenstein THE NEW ORDER", 2100, 654, 6);

productManager.addProduct("The Last Of As", 1200, 584, 8);

console.log('*****PRODUCTS******');
console.log(productManager.getProducts());

console.log('*****PRODUCT BY ID******');
console.log(productManager.getProductById(2))

console.log('*****PRODUCT BY CODE******');
productManager.getProductByCode(584);
console.log('*****PRODUCT BY CODE******');
productManager.getProductByCode(8526);

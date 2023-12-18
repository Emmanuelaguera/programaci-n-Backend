class addProduct{
    constructor() {
      this.product = [];
      this.id= 0;
    }
  
    getProduct() {
      return this.product;
    }
    getProductById(id) {
      let product= this.product.find(product => product.id===id);
      if (product == undefined) {
        return "Not Fund";
      }else {
        return product;
      }
    }
    addProduct(name, price, code, stock) {
      if (!name || !price || !code || !stock) {
        console.log("ValidarbTodos los campos");
      }
  
      if (!this.product.some((p) => p.code === code)) {
        let newProduct = { name, price, code, stock };
  
        this.product.push(newProduct);
        console.log(`El producto ${name} se agreago correctamente`);
      } else {
        console.log(`Ya existe el producto con el codigo ${code}`);
      }
    }
  
    getProductByCode(code) {
     
      let product = this.product.find((p) => p.code === code);
  
      if (product == undefined) {
        console.log(`No existe ningun producto con el codigo ${code}`);
      } else {
        console.log(product);
      }
    }
  }
  
  const product = new addProduct();
  
  product.addProduct("The Last Of As", 1200, 584, 8);
  product.addProduct("Uncharted 4", 4100, 321, 5);
  product.addProduct("Wolfenstein THE NEW ORDER", 2100, 654, 6);
  
  product.addProduct("The Last Of As", 1200, 584, 8);
  
  console.log(product.getProduct());
  console.log(product.getProductById(0))
  
  product.getProductByCode(584);
  product.getProductByCode(8526);

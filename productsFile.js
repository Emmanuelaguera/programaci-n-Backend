const fs = require('fs')

const productManager = new ProductManager();

productManager.addProduct("The Last Of Us", 1200, 584, 8);
productManager.addProduct("Uncharted 4", 4100, 321, 5);
productManager.addProduct("Wolfenstein THE NEW ORDER", 2100, 654, 6);

productManager.addProduct("The Last Of As", 1200, 584, 8);

fs.promises.writeFile('./test.json',JSON.stringify(productManager),{encoding:'utf-8'})

let readRes = fs.promises.readFile('./test.json', {encoding:'utf-8'})
console.log(readRes)









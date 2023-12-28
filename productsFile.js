const fs = require('fs')

let products = [
    {
        name: 'The last of us',
        price: 1200,
        code: 584,
        stock: 8,
        id: this.id
    },
    {
        name: 'Uncharted 4',
        price: 4100,
        code: 321,
        stock: 5,
        id: this.id
    },
    {
        name: 'Wolfenstein THE NEW ORDER',
        price: 2100,
        code: 654,
        stock: 6,
        id: this.id
    }
]

fs.writeFileSync('./test.json', JSON.stringify(products, null, 2), { encoding: 'utf-8' })

fs.promises.readFile('./test.json', 'utf-8')
    .then(addProduct => {
        console.log('promise:', addProduct)
    })
    .catch(err => {
        console.log('Error', err)
    })

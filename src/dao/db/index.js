const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        return mongoose.connect("mongodb+srv://agueraemmanuel:Tedylead09@proyectogames.4jfk3b4.mongodb.net/eccomerce")
        .then(()=>{
            console.log('Base de datos conectada')
        }).catch((err)=>{
            console.log(err)
        })
    }
}
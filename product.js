const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    productid:{
        type:String,
        unique:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const product = mongoose.model('product',ProductSchema)

module.exports=product
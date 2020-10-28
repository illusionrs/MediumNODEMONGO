const express = require('express')
const mongoose = require('mongoose')
const product = require('./product')

const app = express()
const PORT =4000

mongoose.connect( "mongodb+srv://rajeev255:rajeev123@cluster0-uyau0.mongodb.net/EmployeeDb?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



mongoose.connection.on('connected',()=> console.log('connected'))

app.use(express.json())
app.post('/product',async (req,res)=>{

    const {name,productid,price} = req.body

    if(!name || !productid || !price)
    return res.status(400).json({msg: "All fields required"})

    const find = await product.findOne({ productid:productid})

    if(find)
    return res.status(400).json({ msg:"Product Exist with same id"})

    const productdata = new product({
        name,
        productid,
        price
    })
   const data= await productdata.save()

    res.send({ data})

})

app.get("/product/:id",async (req,res)=>{

    const productid = req.params.id 

    const finddata = await product.findOne({productid:productid})

    if(!finddata)
    res.status(400).json({ msg:"Not exist"})

    res.send({finddata})
})

app.get("/product",async (req,res)=>{
   

    const data = await product.find({})

    res.send(data)
    
})
app.get("/", (req,res)=>{

    res.send("It is Working.")
})


app.listen(PORT,()=> console.log("Server is running on %s",PORT))
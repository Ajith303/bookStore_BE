const express = require ("express")
const productRoute = express.Router()
const productController = require ("../controller/productController")

productRoute.post("/create",async(req,res)=>{
    let result = await productController.createProduct (req)
    res.status(result.code).send(result)
})

module.exports = productRoute
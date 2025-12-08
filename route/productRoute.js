const express = require ("express")
const productRoute = express.Router()
const productController = require ("../controller/productController")

productRoute.post("/create",async(req,res)=>{
    let result = await productController.createProduct (req)
    res.status(result.code).send(result)
})

productRoute.get("/get",async(req,res)=>{
    let result = await productController.getProduct(req)
    res.status(result.code).send(result)
})

productRoute.put("/update",async(req,res)=>{
    let result = await productController.updateProduct(req)
    res.status(result.code).send(result)
})

productRoute.put("/delete",async(req,res)=>{
    let result = await productController.deleteProduct(req)
    res.status(result.code).send(result)
})
module.exports = productRoute
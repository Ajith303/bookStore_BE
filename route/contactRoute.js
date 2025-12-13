const express = require ("express")
const contactRoute = express.Router()
const contactController = require("../controller/contactController")

contactRoute.post("/create",async(req,res)=>{
    let result = await contactController.createContact(req)
    res.status(result.code).send(result)
})

contactRoute.get("/get",async(req,res)=>{
    let result = await contactController.getContactDetails(req)
    res.status(result.code).send(result)
})      

contactRoute.delete("/delete",async(req,res)=>{
    let result = await contactController.deleteContact(req)
    res.status(result.code).send(result)
})
module.exports = contactRoute
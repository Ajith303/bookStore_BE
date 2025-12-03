const express = require ("express")
const userRoute = express.Router()
const userController = require ("../controller/userController")

userRoute.post("/create",async(req,res)=>{
    let result = await userController.createUser(req)
    res.status(result.code).send(result)
})

userRoute.post("/login",async(req,res)=>{
    let result = await userController.userLogin(req)
    res.status(result.code).send(result)
})

module.exports = userRoute
const express = require("express")
const userRoute = express.Router()
const userController = require("../controller/userController")

userRoute.post("/create", async (req, res) => {
    let result = await userController.createUser(req)
    res.status(result.code).send(result)
})

userRoute.post("/login", async (req, res) => {
    let result = await userController.userLogin(req)
    res.status(result.code).send(result)
})

userRoute.get("/get", async(req, res) => {
    let result = await userController.getUser(req)
    res.status(result.code).send(result)
})

userRoute.put("/update",async(req,res)=>{
    let result = await userController.updateUser(req)
    res.status(result.code).send(result)
})

userRoute.put("/delete",async(req,res)=>{
    let result = await userController.deleteUser(req)
    res.status(result.code).send(result)
})

module.exports = userRoute
// const express = require("express")
// const userRoute = express.Router()
// const userController = require("../controller/userController")

// userRoute.post("/create", async (req, res) => {
//     let result = await userController.createUser(req)
//     res.status(result.code).send(result)
// })     

// userRoute.post("/login", async (req, res) => {
//     let result = await userController.userLogin(req)
//     res.status(result.code).send(result)
// })

// userRoute.get("/get", async(req, res) => {
//     let result = await userController.getUser(req)
//     res.status(result.code).send(result)
// })

// userRoute.put("/update",async(req,res)=>{
//     let result = await userController.updateUser(req)
//     res.status(result.code).send(result)
// })

// userRoute.put("/delete",async(req,res)=>{
//     let result = await userController.deleteUser(req)
//     res.status(result.code).send(result)
// })

// module.exports = userRoute
const express = require("express")
const userRoute = express.Router()
const userController = require("../controller/userController")

userRoute.post("/create", async (req, res) => {
    let result = await userController.createUser(req)
    res.status(result.code).send(result)
})     

userRoute.post("/login", async (req, res) => {
    let result = await userController.userLogin(req)

    if(result.status){
        res.cookie("token", result.data.token, {
            httpOnly: true,
            secure: false, // production-ல true
            maxAge: 2 * 60 * 1000
        })
        res.cookie("userId", result.data._id, {
            httpOnly: true,
            secure: false,
            maxAge: 2 * 60 * 1000
        })
    }

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

userRoute.post("/logout", async (req, res) => {
    let result = await userController.logoutUser(req)
    res.status(result.code).send(result)
})

userRoute.post("/logout", async (req, res) => {
    let result = await userController.logoutUser(req, res)
    res.status(result.code).send(result)
})


module.exports = userRoute

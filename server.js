const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const AuthMiddleWare = require ("./MiddleWare/AuthMiddlleWare")
const cors = require ("cors")
require('dotenv').config();
const port = 3004
console.log(port)

const userRoute = require ("./route/userRoute")
const productRoute = require("./route/productRoute")
const contactRoute = require ("./route/contactRoute")

const corsOptions = {
     origin:"*",
     Credentials:true,
    optionSuccessStatus:200 
}
app.use(express.json())
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cors(corsOptions))
// app.use(AuthMiddleWare)
app.use("/user",userRoute)
app.use("/product",productRoute)
app.use("/contact",contactRoute)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mangoose conected"))
.catch(err=>console.log(err))

app.listen(port,()=>{console.log(`conected in ${port}`)})

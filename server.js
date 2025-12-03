const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require ("cors")
const port = 3004
console.log(port)

const userRoute = require ("./route/userRoute")
const productRoute = require("./route/productRoute")

const corsOptions = {
     origin:"*",
     Credentials:true,
    optionSuccessStatus:200 
}
app.use(express.json())
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cors(corsOptions))
app.use("/user",userRoute)
app.use("/product",productRoute)

mongoose.connect("mongodb+srv://project:project.123@cluster0.c7p4lyq.mongodb.net/project")
.then(()=>console.log("mangoose conected"))
.catch(err=>console.log(err))

app.listen(port,()=>{console.log(`conected in ${port}`)})



//mongodb+srv://project:project.123@cluster0.c7p4lyq.mongodb.net/?appName=Cluster0
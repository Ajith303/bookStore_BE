const mongoose = require("mongoose")
const {Schema} = require ("mongoose")

const productDetailsSchema = new Schema({
    Image:{type:String,default:null},
    Name:{type:String,default:null},
    Rate:{type:String,default:null},
    deleted:{type:Boolean,default:false}
},{timestamps:true})

const productModel = new mongoose.model("productDetails",productDetailsSchema)
module.exports = productModel
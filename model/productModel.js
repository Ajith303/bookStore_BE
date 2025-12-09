const mongoose = require("mongoose")
const {Schema} = require ("mongoose")

const productDetailsSchema = new Schema({
    imageUrl:{type:String,default:null},
    name:{type:String,default:null},
    rate:{type:String,default:null},
    productInfo:{type:String,default:null},
    deleted:{type:Boolean,default:false}
},{timestamps:true})

const productModel = new mongoose.model("productDetails",productDetailsSchema)
module.exports = productModel
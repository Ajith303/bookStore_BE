const mongoose = require("mongoose")
const {Schema} = require ("mongoose")

const userDetailsSchema = new Schema({
    Name:{type:String,default:null},
    Email:{type:String,default:null},
    Password:{type:String,default:null},
    Role:{type:String,enum:['user',"admin"],default:"user"},
    deleted:{type:Boolean,default:false}
},{timestamps:true})

const userModel = new mongoose.model("userDetails",userDetailsSchema)
module.exports = userModel
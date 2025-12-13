const mongoose = require ("mongoose")
const {Schema} = require("mongoose")

const contactDetailsSchema = new Schema ({
    name:{type:String,default:null},
    phoneNo:{type:Number,default:null},
    email:{type:String,default:null},
    message:{type:String,default:null},
    deleted:{type:Boolean,default:false}
},{timestamps:true})
const contactModel = new mongoose.model("contactDetails",contactDetailsSchema)
module.exports = contactModel
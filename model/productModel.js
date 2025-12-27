const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const productDetailsSchema = new Schema({
    name: {
        type: String
        , default: null
    },
    price: {
        type: Number,
        default: 0.0,
    },
    description: {
        type: String,
        default: null
    },
    rating: {
        type: String,
        default: 0
    },
    image: {
        type: String,
        default:null
    },
    category: {
        type: String,
        enum: ["mobiles", "tv", "fridge", "bike","product"],
        default:"product"
    },
    seller: {
        type: String,
        default:null
    },
    stock: {
        type: Number,
        default:null
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    user:{
        type:mongoose.Schema.ObjectId,
        default:null
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const productModel = new mongoose.model("productDetails", productDetailsSchema)
module.exports = productModel
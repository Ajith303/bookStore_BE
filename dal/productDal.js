const productDal = new Object()
const productModel = require("../model/productModel")

productDal.createProduct = async (req) => {
    try {
        let payload = productModel(req)
        let result = await payload.save()
        if (result) {
            return { status: true, message: "created", data: result }
        }
        return { status: false, message: "failed", data: {} }
    }
    catch (err) {
        return { status: false, message: err ? err.message : "Interl Server Error", data: {} }
    }
}

productDal.getProduct = async (req) => {
    try {
        let result = await productModel.find({ deleted: false })
        if (result) {
            return { status: true, message: "Product Get Successfolly", data: result}
        }
        return { status: false, message: "Failed", data: {} }
    }
    catch (err) {
        return { status: false, message: err ? err.message : "Internal Server Error" }
    }
}

productDal.updateProduct = async (id, data) => {
    try {
        let result = await productModel.findByIdAndUpdate({ _id: id }, data, { new: true }).exec()
        if (result) {
            return { status: true, message: "Product Updated Successfolly", data: result}
        }
        return { status: false, message: "failed", data: {} }
    }
    catch (err) {
        return { status: false, message: err ? err.message : "Inernal Server Error", data: {} }
    }
}


module.exports = productDal
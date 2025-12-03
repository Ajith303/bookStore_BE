const productController = new Object()
const productDal = require ("../dal/productDal")

productController.createProduct = async (req)=>{
    try{
        let body = req.body
        let result = await productDal.createProduct(body)
        if(result){
            return {code:200,status:true,message:result.message,data:result.data}
        }
        return {code:400,status:false,message:result.message,data:{}}
    }
    catch(err){
        return {code:500,status:false,message:err?err.message:"Internal Server error"}
    }
}

module.exports = productController
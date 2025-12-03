const productDal = new Object()
const productModel = require ("../model/productModel")

productDal.createProduct = async (req)=>{
    try{
        let payload = productModel(req) 
        let result = await payload.save()
        if(result){
            return {status:true,message:"created",data:result}
        }
        return {status:false,message:"failed",data:{}}
    }
    catch(err){
        return {status:false,message:err?err.message:"Interl Server Error",data:{}}
    }
}

module.exports = productDal
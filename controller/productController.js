const productController = new Object()
const productDal = require ("../dal/productDal")

productController.createProduct = async (req)=>{
    try{
        let body = req.body
        let result = await productDal.createProduct(body)
        if(result){
            console.log(result,"resultFromDal")
            return {code:200,status:true,message:result.message,data:result.data}
        }
        return {code:400,status:false,message:result.message,data:{}}
    }
    catch(err){
        return {code:500,status:false,message:err?err.message:"Internal Server error"}
    }
}

productController.getProduct = async (req)=>{
    try{
        let result = await productDal.getProduct(req)
        if(result){
            return {code:200,status:true,message:"Product Fetch to Success!",data:result.data}
        }
        return {code:400,status:false,message:"Product Fetch to Failed",data:{}}
    }
    catch(err){
        return {code:500,status:false,message:err?err.message:"Internal Server Eroor",data:result.data}

    }
}

productController.updateProduct = async(req)=>{
    try{
        let body = req.body
        let result = await productDal.updateProduct(body._id,body)
        if(result){
            return {code:200,status:true,message:"Product Updated Successfully",data:result.data}
        }
    }
    catch(err){
        return {code:500,status:true,message:err?err.message:"Internal Server Error",data:{}}
    }
}

productController.deleteProduct = async(req)=>{
    try{
        let body = req.body
        let data={
            deleted:true
        }
        let result = await productDal.updateProduct(body._id,data)
        if(result){
            return {code:200,status:true,message:"Product Deleted Successfully!",data:result.data}
        }
        return {code:400,status:false,message:"Product Deleted failed."}
    }
    catch(err){
        return {code:500,status:true,message:err?err.message:"Internal Server Error"}
    }
}

module.exports = productController
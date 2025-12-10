const userController = new Object()
const userDal = require ("../dal/userDal")
const tokenHelper = require ("../Helper/tokenHelper")
require("dotenv").config()
const key = process.env.secretKey

userController.userLogin = async (req)=>{
    try{
        let body = req.body
        if(!body.Email){
            return {code:400,status:false,message:"email is required"}
        }
        if(!body.Password){
            return {code:400,status:false,message:"password is required"}
        }
        let result = await userDal.findMail(body.Email)
        // console.log(result,"result")
        if(!result.data){
            return {code:400,status:false,message:"email not found"}
        }
        if(body.Password===result.data.Password){
            let token = await tokenHelper.generateAccessToken(result.data._id,result.data.Email,key)
            let resultData = result.data.toObject()
            resultData.token = token 
            return {code:200,status:true,message:"login successfull",data:resultData}
        }
        return {code:400,status:false,message:"enter the correct password"}
    }
    catch(err){
        return {code:500,status:false,message:err?err.message:"internal server error"}
    }

}
userController.createUser = async (req)=>{
    try{
        let body = req.body
        let result = await userDal.createUser(body)
        if(result){
            return {code:200,status:true,message:result.message,data:result.data}
        }
        return {code:400,status:false,message:result.message,data:{}}
    }
    catch(err){
        return {code:500,status:false,message:err?err.message:"Internal Server error"}
    }
}


userController.getUser = async (req) =>{
    try{
        let result = await userDal.getUser(req)
        if(result){
            return {code:200,status:true,message:result.message,data:result.data}
        }
        return {code:400,status:false,message:result.message}
    }
    catch(err){
        return {code:500,message:false,message:err?err.message:"internal server error"}
    }
}

userController.updateUser=async(req)=>{
    try{
        let body = req.body
        let result = await userDal.updateUser(body._id,body) ////////00
        if(result){
            return {code:200,status:true,message:result.message,data:result.data}
        }
         return {code:400,status:false,message:result.message,data:{}}
    }
    catch(err){
         return {code:500,status:false,message:err?err.message:"Internal Server Error"}
    }
}

 userController.deleteUser = async (req) => {
    try{
        let body = req.body
        let data ={
            deleted :true
        }
        let result = await userDal.updateUser(body._id,data)
        if(result){
            return{code:200,status:true,message:"deleted successfully"}
        }
        return{code:400,status:false,message:"deleted failed"}
    }
    catch(err){
        return{code:500,message:err?err.message:"Internal Server Error"}
    }
}
module.exports = userController
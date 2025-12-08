const userDal = new Object()
const userModel = require("../model/userModel")

userDal.createUser = async (req)=>{
    try{
        let payload = userModel(req)
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

userDal.findMail = async(email)=>{
    try{
        let query = [{deleted:false},{Email:email}]
        let result = await userModel.find({$and:query})
        if(result){
            return {status:true,message:"email find successfully",data:result[0]}
        }
        return {status:false,message:"failed",data:{}}
    }
    catch(err){
        return {status:false,message:err?err.message:"inernal server error"}
    }
}

userDal.getUser = async(req)=>{
    try{
        let result = await userModel.find({deleted:false})
        if(result){
            return {status:true,message:"User get Successfully",data:result}
        }
            return {status:false,message:"failed",data:{}}
    }
    catch(err){
        return {status:false,message:err?err.message:"Internel Server Error",data:{}}
    }
}

userDal.updateUser=async(id,data)=>{
    try{
        let result = await userModel.findByIdAndUpdate({_id:id},data,{new:true}).exec()
        if(result){
            return{status:true,message:"Updated Successfully",data:result}
        }
        return{status:false,message:"failed",data:{}}
    }
    catch(err){
        return{status:false,message:err?err.message:"Internal Server Error"}
    }
}



module.exports = userDal
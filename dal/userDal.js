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
        let result = await userDal.find({$and:query})
        if(result){
            return {status:true,message:"email find successfully",data:result[0]}
        }
        return {status:false,message:"failed",data:{}}
    }
    catch(err){
        return {status:false,message:err?err.message:"inernal server error"}
    }
}


module.exports = userDal
const userController = new Object()
const userDal = require ("../dal/userDal")

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
        console.log(result,"result")
        if(!result.data){
            return {code:400,status:false,message:"email not found"}
        }
        if(body.Password===result.data.Password){
            return {code:200,status:true,message:"login successfull"}
        }
        return {code:400,status:false,message:"enter the correct password"}
    }
    catch{
        return {code:500,statusLfalse,message:err?err.message:"internal server error"}
    }

}

module.exports = userController
const contactController = new Object()
const contactDal = require ("../dal/contactDal")


contactController.createContact = async (req)=>{
    try{
        let body = req.body
        if(!body.name){
            return {code:400,status:false,message:"name is required"}
        }
        if(!body.phoneNo){
            return {code:400,status:false,message:"phone number is required"}
        }
        if(!body.email){
            return {code:400,status:false,message:"email is required"}
        }
        if(!body.message){
            return {code:400,status:false,message:"message is required"}
        }
        let result = await contactDal.createContact(body)
        if(result){
            return {code:201,status:true,message:result.message,data:result.data}
        }
        return {code:400,status:false,message:result.message,data:{}}
    }
    catch(err){
        return {code:500,status:false,message:err?err.message:"Internal Server error"}
    }
}

contactController.getContactDetails = async (req)=>{
    try{
        let result = await contactDal.getContact(req)
        if(result){
            return {code:201,status:true,message:"data fetched successfully",data:result.data}
        }
        return {code:400,status:false,message:"failed to fetch data"}
    }
    catch(err){
        return {code:500,status:false,message:err?err.message:"internal server error"}
    }
}

contactController.deleteContact= async (req)=>{
    try{
        let body = req.body
        let data = {
            deleted:true
        }
        let result = await contactDal.updateContact(body._id,data)
        if(result){
            return {code:201,status:true,message:"data deleted successfully",data:result.data}
        }
        return {code:400,status:false,message:"failed to delete"}
    }
    catch(err){
        return {code:500,status:false,message:err?err.message:"internal server error"}
    }
}


module.exports = contactController
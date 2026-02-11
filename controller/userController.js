const userController = new Object()
require("dotenv").config()
const bcrypt = require("bcrypt")
const userDal = require("../dal/userDal")
const validator = require("validator")
const tokenHelper = require("../Helper/tokenHelper")
const key = process.env.SECRET_KEy
//

userController.userLogin = async (req) => {
    try {
        let body = req.body
        console.log(body, "body")
        if (!body.email) {
            return { code: 400, status: false, message: "email is required" }
        }
        if (!body.password) {
            return { code: 400, status: false, message: "password is required" }
        }
        let result = await userDal.findMail(body.email)
        if (!result.data) {
            return { code: 400, status: false, message: "email not found" }
        }
        let isMatch = await bcrypt.compare(body.password, result.data.password)
        if (isMatch) {
            let token = await tokenHelper.generateAccessToken(result.data._id, result.data.email, key)
            let resultData = result.data.toObject()
            resultData.token = token
            return { code: 200, status: true, message: "login successfull", data: resultData }
        }
        return { code: 400, status: false, message: "enter the correct password" }
    }
    catch (err) {
        return { code: 500, status: false, message: err ? err.message : "internal server error" }
    }

}
userController.createUser = async (req) => {
    try {
        let body = req.body
        if (!body.email) {
            return { code: 400, status: false, message: "email is required" }
        }
        if (!body.password) {
            return { code: 400, status: false, message: "password is required" }
        }
        if (body.email) {
            if (!validator.isEmail(body.email)) {
                return { code: 400, status: false, message: "Invalid email format" };
            }
        }
        if (body.password.length > 6) {
            return { code: 400, status: false, message: "Password must be a maximum of 6 characters" }
        }
        let salt = await bcrypt.genSalt()
        let hashPassword = await bcrypt.hash(body.password, salt)
        body["password"] = hashPassword
        let result = await userDal.createUser(body)
        if (result) {
            return { code: 200, status: true, message: result.message, data: result.data }
        }
        return { code: 400, status: false, message: result.message, data: {} }
    }
    catch (err) {
        return { code: 500, status: false, message: err ? err.message : "Internal Server error" }
    }
}


userController.getUser = async (req) => {
    try {
        let result = await userDal.getUser(req)
        if (result) {
            return { code: 200, status: true, message: result.message, data: result.data }
        }
        return { code: 400, status: false, message: result.message }
    }
    catch (err) {
        return { code: 500, status: false, message: err ? err.message : "internal server error" }
    }
}

userController.updateUser = async (req) => {
    try {
        let body = req.body
        let result = await userDal.updateUser(body._id, body)
        if (result) {
            return { code: 200, status: true, message: result.message, data: result.data }
        }
        return { code: 400, status: false, message: result.message, data: {} }
    }
    catch (err) {
        return { code: 500, status: false, message: err ? err.message : "Internal Server Error" }
    }
}

//log out
userController.logoutUser = async (req, res) => {
    try {
        let result = await userDal.logoutUser()
        if (result.status) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: false
            })
            res.clearCookie("userId", {
                httpOnly: true,
                secure: false
            })
            return { code: 200, status: true, message: "Logged out successfully" }
        }
        return { code: 400, status: false, message: result.message }

    } catch (err) {
        return {
            code: 500,
            status: false,
            message: err ? err.message : "Logout error"
        }
    }
}


userController.deleteUser = async (req) => {
    try {
        let body = req.body
        let data = {
            deleted: true
        }
        let result = await userDal.updateUser(body._id, data)
        if (result) {
            return { code: 200, status: true, message: "deleted successfully", data:result.data }
        }
        return { code: 400, status: false, message: "deleted failed" }
    }
    catch (err) {
        return { code: 500, message: err ? err.message : "Internal Server Error" }
    }
}
module.exports = userController
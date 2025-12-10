const jwt = require('jsonwebtoken');
const url = require('url');
const tokenHelper = require ("../Helper/tokenHelper")
const userModel = require ("../model/userModel")
const allowedPath = require ("../Helper/allowedPath")
require('dotenv').config();

const AuthMiddleWare = async (req, res, next) => {
  try {
    const pathname =url.parse (req.originalUrl).pathname
    if(allowedPath.includes(pathname)){
      return next()
    }
  
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).send({
        status: false,
        message: "Token missing in headers",
      });
    }
  const userId = req.headers["userid"] || req.headers["userId"]
     if (!userId) {
      return res.status(403).send({
        status: false,
        message: "userId missing in headers",
      });
    }

    const userData = await userModel.findById(userId)
     if (!userData) {
      return res.status(401).send({
        code : 401,
        status: false,
        message: "user not found",
      });
    }

    // verify token
    const token = authorization.split(" ")[1]; 
    const decoded = tokenHelper.verifyAccessToken(token, process.env.secretKey)   
    //const decoded = jwt.verify(token, process.env.secretKey);

    if (!decoded || !decoded.userId) {
      return res.status(401).send({
        code : 401,
        status: false,
        message: "Invalid token or user data missing",
      });
    }
    
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        code : 401,
        status: false,
        message: "Token expired, please login again",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        code : 403,
        status: false,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      code : 500,
      status: false,
      message: "AuthMiddlewareError",
      data: error.message,
    });
  }
};

module.exports = AuthMiddleWare

const jwt = require("jsonwebtoken")
const tokenHelper = new Object()

tokenHelper.generateAccessToken = async (userid, email, secretKey) => {                   
  const accessToken = await jwt.sign({ userId: userid, Email: email }, secretKey, { expiresIn: "3m" });
  return accessToken;
}

tokenHelper.verifyAccessToken = (token, secretKey) => {            
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null
  }
}

tokenHelper.decodeAccessToken = (token) => {                       
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

module.exports=tokenHelper
const jwt = require("jsonwebtoken")
const tokenHelper = new Object()

tokenHelper.generateAccessToken = async (userid, email, secretKey) => {                      //user kitta vangurathu
  const accessToken = await jwt.sign({ userId: userid, Email: email }, secretKey, { expiresIn: "48h" });
 // const accessToken = jwt.sign({ userId: userid, mobileNo: mobile }, secretKey, { expiresIn: "3m" });
  return accessToken;
}

tokenHelper.verifyAccessToken = (token, secretKey) => {             //token um key um same ah nu check pannanum
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null
  }
}

tokenHelper.decodeAccessToken = (token) => {                        //data va check pndrathu   
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

module.exports=tokenHelper
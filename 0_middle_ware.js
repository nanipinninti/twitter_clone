const jwt = require("jsonwebtoken")
const SECRET_KEY = "Nani_pinninti"
const token_verify = (req,res,next)=>{
    const jwt_token = req.header("Authorization")?.replace("Bearer ","")
    if (!jwt_token){
        return res.status(401).json({message : "Invalid JWT Token"})
    }
    try{
        const decoded = jwt.verify(jwt_token,SECRET_KEY)
        req.user = decoded
        next()
    }
    catch(error){
        return res.status(400).json({message : "Invalid JWT Token"})
    }
}

module.exports = token_verify
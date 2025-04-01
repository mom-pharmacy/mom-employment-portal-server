const jwt = require("jsonwebtoken")

const verifyAdmin = async (req , res , next)=>{
    const authorization = req.headers["authorization"] ;
    console.log(authorization)
    if(!authorization){
        return res.json({msg:"Unauthorized" , status:false})
    }
    const token  = authorization.split(" ")[1];
    if(!token){
        return res.json({msg:"Token is invalid" , status:false})
    }
    try{
        jwt.verify(token , process.env.SECRET_KEY ,(err , decode)=>{
            console.log(decode)
            if(decode.isAdmin){
                req.permission = true;
                next();
            }else{
                res.status(401).json({msg:"Unauthorized access"})
            }
        });
       
    }catch(e){
        res.status(500).json({msg:"Internal server error" , e})
    }
}

module.exports = {verifyAdmin}
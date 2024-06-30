const jwt = require('jsonwebtoken')
const secretkey = "phyvauac.lk@2024"

function verifyToken(req,res,next){
    try{
        const token = req.headers.authorization

        if(token){
            return res.status(403).json({error_message:"token not available"})
        }

        jwt.verify(token.split(" ")[1],secretkey,(err,decoded)=>{
            if(err){
                return res.status(401).json({error_message:"Invalid token"})
            }
            console.log(token)
            console.log(decoded)
            next()

        })

    }
    catch(error){
        return res.status(400).json({error_message:error.message})
    }
    
}

module.exports={verifyToken}
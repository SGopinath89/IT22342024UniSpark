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


async function verifyUserToken(req, res, next, userModule) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], secretkey);
        const user = await userModule.findById(decoded.id);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send(err);
    }
}

module.exports={verifyToken}
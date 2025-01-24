const jwt = require('jsonwebtoken');

const jwtauthmiddleware = (req, res, next)=>{

    /// if token not exist 
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(404).json({error: "token not found"})
    }
    /// extract the jwt token from the request header
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'unauthirized'});  
    }else{
        try{
            const decoded = jwt.verify(token, process.env.secret_key);
            req.user = decoded;
            next();
        }catch(err){
            console.log(err);
            res.status(401).json({error: 'invalid token'});
        }
    }   
    
};

const generatetoken = (userdata) =>{
    return jwt.sign(userdata, process.env.secret_key);
}

module.exports = {jwtauthmiddleware, generatetoken};


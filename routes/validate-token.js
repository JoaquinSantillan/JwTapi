const jwt = require('jsonwebtoken')
const User = require('../models/User')
//middleware validate token

const verifyToken = async(req,res,next)=>{
    const token = req.header('auth-token')


    // if(!req.user){
    //     return res.status(500).json({
    //         Message:"first verify jwt"
    //     })
    // }

    // if(req.role !== "ADMIN_ROLE"){
    //     return res.status(401).json({
    //         message:"no licence"
    //     })
    // }

    if(!token){
        return res.status(401).json({error:'acceso denegado'})
    }
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next() 
    }catch(error){
        res.status(400).json({error:'token invalid'})
    }
}

module.exports = verifyToken
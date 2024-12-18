const jwt = require('jsonwebtoken')
const User = require('../models/user')
exports.authenticate = async (req,res,next)=>{

    try{
        const token = req.header('Authorization')   
        console.log("toenn  ",token)     
        const obj = jwt.verify(token,process.env.tokenSecret)
        console.log(obj)
        let user = await User.findByPk(obj.id)
        
        if(!user){
            throw new Error("User not found")
        }
        req.user = user
        next()
    }catch(err){
        console.log("err ",err,err.info,err.message,"-<")
        res.status(401).json({
            success:false,
            error:err.message || "Something went wrong"
        })
    }
}
exports.socketAuthenticate = async (token)=>{

    try{
          
        console.log("toenn  ",token)     
        const obj = jwt.verify(token,process.env.tokenSecret)
        console.log(obj)
        let user = await User.findByPk(obj.id)
        
        if(!user){
            throw new Error("User not found")
        }
        
        return {success:true,user}
        
    }catch(err){
        console.log("error ",err)
        return {success:false}
    }
}
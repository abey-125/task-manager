const jwt= require ('jsonwebtoken')
const User = require('../models/users')
// to authenticate the user means to check if user is logged in or not and also to make sure that you can access your profile only

const auth = async (req,res,next)=>{
    try{
        const token= req.header('Authorization').replace('Bearer ' ,'')
        
        const decoded =  jwt.verify(token,"thisismynodecourse")
        
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token=token
        req.user =user
        next()


    }
    catch(e){
        res.status(401).send("unable to authenticate"+e)
    }
}

module.exports = auth
const mongoose= require('mongoose')
const validator= require('validator')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true

    },
    password:{
        type:String,
        require:true,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password') ){
                throw new Error('password should not have password')
            }
            if(value.length<6){
                throw new Error(' password length should be greater than 6')
            }
        }

    },
    age:{
        type:Number,
        required:false,
        default:18,
        validate(value){
            if(value<0){
                throw new Error(' value must be an integer')
            }

        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                // console.log('this is not a valid email ')
                throw new Error(' this is not a valid email')
            }
        }

    },
    avatar:{
        type:Buffer
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
},{
    timestamps:true
})

userschema.virtual('task',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})


userschema.methods.toJSON=  function(){
   
        const user= this
        const userObject = user.toObject()
        delete userObject.password
        delete userObject.tokens
        delete userObject.avatar

        return userObject

    
}


userschema.methods.generateAuthToken= async function (){
    const user = this 
    const token = await jwt.sign({_id:user._id.toString()},process.env.SECRET)
    user.tokens = user.tokens.concat({ token })
     await user.save()
    //  console.log("erro")
    return token

}

userschema.statics.findByCredentials= async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("unable to login")
    }
    const isMatch =  await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }
    console.log('test')
    return user


}

userschema.pre('save',async function(next){
    console.log('inside middleware')
    const user = this
    if(user.isModified('password')){
        user.password =  await bcrypt.hash(user.password,8)

    }

    next()

})


userschema.pre('remove', async function(next){

    const user = this
    await Task.deleteMany({owner:user._id})

    next()
})


const User= mongoose.model('User',userschema)





module.exports= User
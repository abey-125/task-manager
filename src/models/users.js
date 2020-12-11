const mongoose= require('mongoose')
const validator= require('validator')



const User= mongoose.model('User',{
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
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                // console.log('this is not a valid email ')
                throw new Error(' this is not a valid email')
            }
        }
    }
})

module.exports= User
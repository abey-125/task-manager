const mongoose = require('mongoose')

const taskschema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        required:false,
        default:false
    },
    owner:{
        type:String,
        required:true,
        ref:"User"
    }
},{
    timestamps:true
})

const Task= mongoose.model('Task',taskschema)

module.exports= Task
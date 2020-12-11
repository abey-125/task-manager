const mongoose= require('mongoose')
const validator= require('validator')
// require('./db/models')



mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

//  creating a model in mongoose


// const User= mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true

//     },
//     password:{
//         type:String,
//         require:true,
//         trim:true,
//         validate(value){
//             if(value.toLowerCase().includes('password') ){
//                 throw new Error('password should not have password')
//             }
//             if(value.length<6){
//                 throw new Error(' password length should be greater than 6')
//             }
//         }

//     },
//     age:{
//         type:Number,
//         required:false,
//         default:18,
//         validate(value){
//             if(value<0){
//                 throw new Error(' value must be an integer')
//             }

//         }
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 // console.log('this is not a valid email ')
//                 throw new Error(' this is not a valid email')
//             }
//         }
//     }
// })





// const me = new User({
//     name:'  Abey  ',
//     password:'world',
//    age:25,
//    email:'  AbeyA@ccCOM.com'
    
    
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('the error is ',error)
// })

// const Task= mongoose.model('Task',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         required:false,
//         default:false
//     }
// })

// const task1= new Task({
//     description:'sleep before 2    ',
    
// })

// task1.save().then(()=>{
//     console.log(task1)
// }).catch(()=>{
//     console.log('There is an error',error)
// })
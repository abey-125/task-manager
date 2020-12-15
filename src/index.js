const express= require('express')
require('./db/mongoose')

const taskrouter =require('./router/task_router')
const userrouter = require('./router/userrouter')


const { json } = require('express')

const app = express()
const port = process.env.PORT||3000

app.use(express.json())
app.use(taskrouter)
app.use(userrouter)

// app.post('/users',(req,res)=>{
//     const user1= new User(req.body)
//     user1.save().then(()=>{
//         res.send(user1)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

// const bcrypt = require('bcryptjs')
// const myfun= async ()=>{
//     const password= 'Abey12345'
//     try{
//         const hashedpassword =  await bcrypt.hash(password,8)

//     console.log(password)
//     console.log(hashedpassword)

//     const result=await bcrypt.compare("Abey1245",hashedpassword)
//     console.log(result)

//     }
//     catch(e){
//         console.log("the error is "+e)
//     }


// }
// myfun()
    






app.listen(port,()=>{
    console.log(' The port is up and running')
})
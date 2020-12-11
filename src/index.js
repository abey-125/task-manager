const express= require('express')
require('./db/mongoose')
const User = require('./models/users')
const Task = require('./models/task')
const { json } = require('express')

const app = express()
const port = process.env.PORT||3000

app.use(express.json())

// app.post('/users',(req,res)=>{
//     const user1= new User(req.body)
//     user1.save().then(()=>{
//         res.send(user1)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

app.post('/users',async(req,res)=>{
    const user1= new User(req.body)
    
    try{
        await user1.save()
        res.send(user1)
        

    }
    catch(e){
        res.send(e).status(404)
    }

})


app.get('/users', async(req,res)=>{
    // User.find({}).then((users)=>{
    //     res.send(users)

    // }).catch((e)=>{
    //     res.send(e).status(400)
    // })
    try{
        const users= await User.find({})
        res.send(users)

    }
    catch(e){
        res.send(e).status(404)

    }


})  
app.get('/users/:id',async(req,res)=>{
    // console.log(req.params)
    const id= req.params.id
    // User.findById(id).then((user)=>{
    //     if(!user){
    //       return  res.status(404).send()
    //     }
    //     res.send(user)

    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
    try{
        const user= await User.findById(id)
        console.log(user.id)
        if(user._id){
            return res.send('not found').status(404)
        }
        res.send(user)


    }
    catch(e){
        res.send('not found'+e).status(500)

    }


})

app.get('/tasks',async(req,res)=>{
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks).status(201)
    // }).catch((e)=>{
    //     res.send(e).status(500)
    // })
    try{
        const task= await Task.find({})
        res.send(task)

    }
    catch(e){
        res.send(e).status(404)

    }
})



app.get('/tasks/:id',async(req,res)=>{
    const _id= req.params.id
    
    // Task.findById(_id).then((tasks)=>{
        
    //     if(!tasks){
    //         return res.status(404).send(req.body.id)

    //     }
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send(e)

    // })

    try{
        const task= await Task.findById(_id)
        console.log(task.id)
        if(!task){
            return res.status(404).send('not found')
        }
        res.send(task)


    }
    catch(e){
        res.send('not found'+e).status(500)

    }


})




app.post('/tasks',(req,res)=>{
    const task1= new Task(req.body)
    task1.save().then(()=>{
        res.status(201).send(task1)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})


app.patch('/tasks/:id',async(req,res)=>{
    const validate = Object.keys(req.body)
    const itemsintask=['description','completed']
    const valintask = validate.every((key)=>{
        return itemsintask.includes(key)
    })
    if(!valintask){
        return res.status(404).send({'error':'not a valid key'})

    }

    const id = req.params.id
    
    try{
        const task1=  await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,useFindAndModify:false})
        res.send(task1)

    }
    catch(e){
        res.status(500).send(e)

    }


})

app.delete('/tasks/:id',async (req,res)=>{

  
  try{
    const task= await Task.findByIdAndDelete(req.params.id)
    if(!task){
        res.status(404).send({"error":"Id not found"})
    }
    res.send(task)

  }
  catch(e){
      res.status(500).send("error"+e)

  }
})



app.listen(port,()=>{
    console.log(' The port is up and running')
})
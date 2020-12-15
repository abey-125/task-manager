const express = require('express')
const Task = require('../models/task')
const taskrouter = new express.Router()


taskrouter.get('/tasks',async(req,res)=>{
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



taskrouter.get('/tasks/:id',async(req,res)=>{
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




taskrouter.post('/tasks',(req,res)=>{
    const task1= new Task(req.body)
    task1.save().then(()=>{
        res.status(201).send(task1)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})



taskrouter.patch('/tasks/:id',async(req,res)=>{
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
        const task = await Task.findById(id)
        validate.forEach((key)=>{
            task[key]=req.body[key]
        })
        task.save()

        // const task1=  await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,useFindAndModify:false})
        res.send(task)

    }
    catch(e){
        res.status(500).send(e)

    }


})

taskrouter.delete('/tasks/:id',async (req,res)=>{

  
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


module.exports= taskrouter
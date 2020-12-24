const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const taskrouter = new express.Router()


taskrouter.get('/tasks',auth,async(req,res)=>{
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks).status(201)
    // }).catch((e)=>{
    //     res.send(e).status(500)
    // })
    try{
        const match={}
        const sort={}

        if(req.query.completed){
            match.completed= req.query.completed==='true'
        }
        if(req.query.description){
            match.description=req.query.description
        }
        if(req.query.sortBY){
            const part = req.query.sortBY.split(':')
            sort[part[0]]= part[1]==='desc'?-1:1
        }

        await req.user.populate({
            path:'task',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort

            }
        }).execPopulate()
        // const task= await Task.find({owner:req.user._id})
        res.send(req.user.task)
        // res.send(task)

    }
    catch(e){
        res.send(e).status(404)

    }
})



taskrouter.get('/tasks/:id',auth,async(req,res)=>{
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
        const task= await Task.findOne({_id:_id,owner:req.user._id})
        console.log("ths taks is "+task)
        if(!task){
            return res.status(404).send('not found')
        }
        res.send(task)


    }
    catch(e){
        res.status(500).send('unable to fetch the record.')

    }


})




taskrouter.post('/tasks',auth,(req,res)=>{
    // const task1= new Task(req.body)
    const task1= new Task({
        ...req.body,
        owner:req.user._id

    })
    task1.save().then(()=>{
        res.status(201).send(task1)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})



taskrouter.patch('/tasks/:id',auth,async(req,res)=>{
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
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        // const task = await Task.findById(id)
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

taskrouter.delete('/tasks/:id',auth,async (req,res)=>{

  
  try{
      const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    // const task= await Task.findByIdAndDelete(req.params.id)
    if(!task){
        res.status(404).send({"error":"Id not found"})
    }
    res.send("task deleted sucessfully ")

  }
  catch(e){
      res.status(500).send("error"+e)

  }
})


module.exports= taskrouter
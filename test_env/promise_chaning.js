require('../src/db/mongoose')
const Task = require('../src/models/task')
const express = require('express')
const { count } = require('../src/models/task')
// Task.findByIdAndDelete('5fc93be98f6bb21b82f183c7').then(()=>{
//     console.log("task deleted successfully")
//     return Task.countDocuments({'completed':false})
    
//     }).then((count)=>{
//         console.log('the count is :',count)
//     }).catch((e)=>{
//         console.log(e)
//     })

    const deletetaskandcount = async (id)=>{
        await Task.findByIdAndDelete(id)
        const count = await Task.countDocuments({'completed':false})

        return count
    }

    deletetaskandcount('5fccd2c55338491d2e530fff').then((count)=>{
        console.log(count)
    }).catch((e)=>{
        console.log(e)
    })

// const app = express()
// const port = process.env.PORT ||3000

// app.get('/tasks/:id',(req,res)=>{
//     const id= req.params.id
//     console.log(id)
//     Task.findByIdAndDelete(id).then(()=>{
//         return Task.countDocuments({'completed':false})

//     }).then((count)=>{
//         res.send(count)
//     }).catch((e)=>{
//         res.send(e)
//     })
// })

// app.listen(port,()=>{
//     console.log('the port is up and running')
// })
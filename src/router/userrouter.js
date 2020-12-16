const express= require('express')
const auth = require('../middleware/auth')
const User = require('../models/users')
const userrouter = new express.Router()

userrouter.post('/users',async(req,res)=>{
    const user1= new User(req.body)
    
    try{
        await user1.save()
        const token = await  user1.generateAuthToken()
        res.send({user1,token})
        

    }
    catch(e){
        res.send(e).status(404)
    }

})


userrouter.get('/users/me',auth, async(req,res)=>{
    // User.find({}).then((users)=>{
    //     res.send(users)

    // }).catch((e)=>{
    //     res.send(e).status(400)
    // })
    // try{
    //     const users= await User.find({})
    //     res.send(users)

    // }
    // catch(e){
    //     res.send(e).status(404)

    // }
    res.send(req.user)


})  

userrouter.patch('/users/:id', async (req,res)=>{
    const validate = Object.keys(req.body)
    const itemsinuser=['name','email','age','password']
    // console.log(validate)
    const validuser= validate.every((key)=>{
        return itemsinuser.includes(key)
    })

    if(!validuser){
        return res.status(404).send("error not able to modify")
    }

    const id =req.params.id
    try{
        const user =await User.findById(id)
        // console.log("test")
        validate.forEach((update)=>{
            user[update]= req.body[update]

        })
        await user.save()
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

userrouter.post('/users/login', async (req,res)=>{
    try{
       
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await  user.generateAuthToken()
        // await  user.generateAuthTocken()
        // console.log(tocken)
        
        res.send(user)

    }
    catch(e){
        res.status(400).send("there is an error"+e)

    }
})

userrouter.get('/users/:id',async(req,res)=>{
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

module.exports = userrouter
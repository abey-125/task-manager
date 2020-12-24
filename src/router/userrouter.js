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

userrouter.post('/users/logout',auth,async(req,res)=>{
    try{
    req.user.tokens= req.user.tokens.filter((token)=>{
        
        return token.token!==req.token

    })
   

    await req.user.save()
    res.status(200).send("logged out sucessfully ..")
}
catch(e){
    res.status(400).send("something went wrong"+e)

}
})

userrouter.post('/users/logoutall',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.status(200).send("logged out of all sessions")


    }
    catch(e){
        res.status(400).send("unable to loggout of all session"+e)

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

userrouter.patch('/users/me',auth,async (req,res)=>{
    const validate = Object.keys(req.body)
    const itemsinuser=['name','email','age','password']
    // console.log(validate)
    const validuser= validate.every((key)=>{
        return itemsinuser.includes(key)
    })

    if(!validuser){
        return res.status(404).send("error not able to modify")
    }

    // const id =req.params.id
    try{
        // const user =await User.findById(id)
        // console.log("test")
        const user =req.user
        // console.log(user)
        validate.forEach((update)=>{
            user[update]= req.body[update]

        })
        await user.save()
        res.send(user)
    }
    catch(e){
        res.status(500).send("an error accoured"+e)
    }
})

userrouter.post('/users/login', async (req,res)=>{
    try{
       
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await  user.generateAuthToken()
        // await  user.generateAuthTocken()
        // console.log(tocken)
        
        res.send({user,token})

    }
    catch(e){
        res.status(400).send("there is an error"+e)

    }
})

userrouter.delete('/users/me',auth,async(req,res)=>{
    try{
        
        await req.user.remove()
        res.send("removed your accout..")

    }
    catch(e){
        res.status(400).send()
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
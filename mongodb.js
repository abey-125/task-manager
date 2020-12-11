// CRED operation
const mongodb = require('mongodb')
const MongoClient =mongodb.MongoClient
const objectId= mongodb.ObjectId



const connectionURL= 'mongodb://127.0.0.1:27017'

const databaseName = 'task-manager'
const id= new objectId()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
if(error){
    return console.log(' an error occured',error)
}

// console.log('connection went well')
const db=client.db(databaseName)
// db.collection('users').insertOne({
//     name:'anand',
//     age:22
// })

// db.collection('users').insertMany([{
//     name:'dona',
//     age:23
// },
// {
//     name:'jiss',
//     age:22
// }],(error,result)=>{
//     if(error){
//         return('unabel to add data to table')
//     }
//     console.log(result.ops)
// })
// db.collection('tasks').insertMany([{
//     desc:'complete one hour of node class',
//     status:'incomplete'
// },
// {
//     desc:'upload weather app in linkedin',
//     status:'incomplete',

// },{
//     desc:'install mongodb in ubuntu',
//     status:'completed'
// }],(error,result)=>{
//     if(error){
//         return console.log('an error occured')
//     }
//     console.log(result.ops)
// })


// db.collection('users').findOne({name:'bAey'},(error,user)=>{
//     console.log(user)
// })

// db.collection('users').find({age:23}).toArray((error,users)=>{
//     console.log(users)
// })


// db.collection('users').find({age:23}).count((error,count)=>{
//     console.log(count)
// })

// challenge task
// db.collection('tasks').findOne({_id:new objectId("5fc7e252659a5e198ff449ee")},(error,user)=>{
//     console.log(user)
// })

// /home/abey/Downloads/mongodb/bin/mongod --dbpath /home/abey/Downloads/mongodb-data

// db.collection('tasks').find({status:'incomplete'}).toArray((error,task)=>{
//     console.log(task)
// })


// const updatePromise= db.collection('users').updateOne({
//     _id:new objectId("5fc729d9227e712b97d4fec2")
// },{
//     $set:{
//         age:24
//     }
// })

// updatePromise.then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

// db.collection('tasks').updateMany({status:"incomplete"},{
//     $set:{
//         status:'completed'
//     }
// }).then((result)=>{
//     console.log(result.modifiedCount)
// }).catch((error)=>{
//     console.log(erro)
// })

// db.collection('users').deleteMany({
//     age:22
// }).then((result)=>{
//     console.log(result.deletedCount)
// }).catch((error)=>{
//     console.log(error)
// })

db.collection('tasks').deleteOne({
    desc:'complete one hour of node class'
}).then((result)=>{
    console.log(result.deletedCount)
}).catch((error)=>{
    console.log(error)
})


}) 
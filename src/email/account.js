const sgMail = require('@sendgrid/mail') 
const { model } = require('mongoose')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelocomeEmail = (email,name)=>{
    
    sgMail.send({
        to:email,
        from:"abeyantony@cs.ajce.in",
        subject:"Welcome to my app",
        text:`Hi ${name}, welcome to my app . feel free to use all the available features to your convinence .`
    })
    

}

const sendCancelEmail =  (email,name)=>{
    
      sgMail.send({
        to:email,
        from:"abeyantony@cs.ajce.in",
        subject:"Welcome to my app",
        text:`Hi ${name}, please let us know why you are leaving our service .Thanks for being with us`
    })
    
}

module.exports={
    sendWelocomeEmail,
    sendCancelEmail
}
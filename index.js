const express = require('express')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const app =express()

const port=3000;
const posts=[
    //create 5 diffrent posts on this format name:"talha",data:"he is a coder"
    {name:"talha",data:"he is a coder"},
    {name:"talha",data:"he is a sexxy"},
    {name:"ahmad",data:"he is a broke"},
    {name:"faris",data:"he is a newbi"},
    {name:"jasim",data:"he is a idekw"},
    {name:"rahib",data:"he is a brosk"},  
]

app.use(express.json())

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const authToken=authHeader && authHeader.split(' ')[1];

    if(!authToken) return res.sendStatus(401).json({ERROR:"You didn't provided access Token yet..."})
    jwt.verify(authToken,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403).json({ERROR:"You don't have access with this token..."})
        req.user=user
        next()
    })

}
app.get('/',(req,res)=>{
    res.json({msg:"hello from '/'"})
})

app.get('/posts',authenticateToken,(req,res)=>{
    try{
        if(req.user.name==req.body.name){
            res.json({
                posts:posts.filter(post=>post.name==req.user.name)
            })
        }else{
            res.json({ERROR:"You don't have access with this token..."})
        }
    }catch(err){
        res.json({ERROR:err})
    }
    })

app.post('/login',(req,res)=>{

    const username=req.body.name;
    const user={name:username}

    const authToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({
        userName:user.name,
        authToken:authToken
    })
})

app.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`)
})

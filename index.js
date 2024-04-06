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

const authenticateToken=(rea,res,next)=>{
    
}
app.get('/',(req,res)=>{
    res.json({msg:"hello from '/'"})
})

app.get('/posts',(req,res)=>{
    const authHeaders=req.headers['authorization']
    const uName=req.body.name;
    // const response=
    res.json({
        authHeaders:authHeaders,
        posts:posts.filter(post=>post.name==uName)
    })
    // res.json({uName})
})

app.post('/login',(req,res)=>{
    // res.json({msg:"hello from '/login'"})

    const username=req.body.name;
    const user={name:username}

    const authToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({
        reqName:req.body.name,
        user:user,
        userName:user.name,
        authToken:authToken
    })
})

app.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`)
})

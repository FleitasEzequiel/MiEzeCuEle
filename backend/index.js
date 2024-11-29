import express from "express"

const App = express()
App.listen(3000,()=>{
    console.log('ta andando')
})

App.get("/",async (req,res)=>{
    res.send("holiwis")
})
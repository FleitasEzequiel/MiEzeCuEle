import express from "express"
import db from "./db.js"
const App = express()
App.use(express.urlencoded({ extended: true }))
App.listen(3000,()=>{
    console.log('ta andando')
})

App.get("/",async (req,res)=>{
    try {
        console.log("lol")
    } catch (error) {
        console.log(error)
    }
    res.sendFile("login.html",{root:"./"})
})

App.post("/",async (req,res)=>{
    try{
        db()
    }catch{

    }
    console.log(req.body)
    res.send("hola")
})
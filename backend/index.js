import express from "express"
import db from "./db.js"
import ejs from "ejs"
const App = express()
App.use(express.urlencoded({ extended: true }))
App.set("view engine","ejs")
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
    let info = {}
    try{
            const resp = await db(req.body)
            info = resp
    }catch(error){
        console.log("error",error)
        info = error
    }
    res.render("home.ejs",{
        title:"home",
        info:info
    })
})
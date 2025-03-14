import express, { Errback } from "express"
import cookieHelper from "./helpers/cookieHelper.js"
import dbMapper from "./helpers/dbMapper.js"
import db from "./db.js"
import { Info } from "./types.js"
import * as ejs from "ejs"
import { RowDataPacket } from "mysql2/promise.js"
const App = express()
App.use(express.urlencoded({ extended: true }))
App.set("view engine","ejs")
App.listen(3000,()=>{
    console.log('ta andando')
})

App.get("/",async (req,res)=>{
    try {
        res.sendFile("login.html",{root:"./"})        
    } catch (error) {
        res.send("Error al cargar").status(500)
    }
})

App.post("/",async (req,res)=>{
    // Declaración de variables
    const { Database, user, password,query, dbName }  = req.body 
    const cookie = cookieHelper(req.headers.cookie)
    cookie ? cookie.Database = Database : false 
    let info : Info = {database:"",dbs:[],result:[]}
    
    if (req.body.session == "logout"){
        res.clearCookie("user")
    }
    try{
        const resp = await db(cookie ? cookie : req.body)
        const data = await resp.query<RowDataPacket[]>(`SELECT TABLE_NAME,TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES`,(_err:Error,rows: [])=>rows)
        const dbs = await resp.query<RowDataPacket[]>(`SHOW DATABASES`,(_err: Error,rows: [])=> rows )
        info.dbs = dbMapper(data,dbs[0])
        //Crear Cookie Si No Existe
        info.dbs.forEach((db : object) => {
            console.log(db)
        });
        if (!cookie){
            console.log("no hay cookie")
            const session = {
                user: user,
                password: password,
            }
            res.cookie("user",session)
        }
        //----------------------
        //Si existe una consulta realizarla
        if (query){
            await resp.query(`USE \`${Database || "sys"}\` `)
                const result = await resp.query(query)
                info.result = result
        }        
        if (dbName){
            console.log("Hola",dbName)
            resp.query(`CREATE DATABASE ${dbName};`)
        }
    }catch(error ){
        res.render("login.ejs",{
            title:"login",
            info:info
        })
        console.log("acá",typeof(error))
        // info.error = typeof(error) !== 'unknown' ? "chi" : error
//         if (error.errno == 1045){
//             res.clearCookie("user")
// }
    }


    res.render("home.ejs",{
        title:"home",
        info:info,
        session:cookie
    })
})


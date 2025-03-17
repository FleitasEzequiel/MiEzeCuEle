import express, { Errback, Request, Response } from "express"
import cookieHelper from "./helpers/cookieHelper.js"
import dbMapper from "./helpers/dbMapper.js"
import db from "./db.js"
import { Info } from "./types.js"
import * as ejs from "ejs"
import { RowDataPacket } from "mysql2/promise.js"
const App = express()
App.use(express.urlencoded({ extended: true }))
App.set("view engine","ejs")
App.set('views', "./dist/" + 'views');
App.listen(3000 ,()=>{
    console.log('ta andando')
})

App.get("/",async (_req : Express.Request,res: Response)=>{

    try {
        res.sendFile("login.html",{root:"./dist/"})        
    } catch (error) {
        res.send("Error al cargar").status(500)
    }
})

App.post("/",async (req,res)=>{
    // Declaración de variables
    const { Database, user, password,query, dbName }  = req.body 
    const cookie = req.headers.cookie && cookieHelper(req.headers.cookie)
    cookie ? cookie.Database = Database : false 
    let info : Info = {database:"",dbs:[],result : [] }
    
    if (req.body.session == "logout"){
        res.clearCookie("user")
    }
    try{
        const resp = await db(cookie ? cookie : req.body)
        const data = await resp.query<RowDataPacket[]>(`SELECT TABLE_NAME,TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES`).then((rows)=>rows[0]) as []
        const dbs = await resp.query<RowDataPacket[]>(`SHOW DATABASES`).then((value)=>value[0]) as []
        info.dbs = dbMapper(data,dbs)
        // info.dbs = dbs.map((db: {Database: string, tables?: string[]}) => {
        //     db.tables = data.filter((el: {TABLE_SCHEMA : string}) =>
        //         el.TABLE_SCHEMA == db.Database
        //     ).map((el: {TABLE_NAME : string})=>el.TABLE_NAME)})
        // dbs.map((db : any)=> db.tables = data.filter((row: any)=>row.TABLE_SCHEMA == db.Database))
        //Crear Cookie Si No Existe

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
        console.log('entro por acá',error)
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


"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = __importDefault(require("./db.js"));
const cors_1 = __importDefault(require("cors"));
// const Action = {
//     setCookie: (data: {user :string, password: string}) =>{
//         express.response.cookie("user",data)
//     },
//     removeCookie: () =>{
//         response.clearCookie("user")
//     }
// }
const App = (0, express_1.default)();
App.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
App.use(express_1.default.urlencoded({ extended: true }));
App.listen(3000, () => {
    console.log('ta andando');
});
App.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendFile("login.html", { root: "./dist/" });
    }
    catch (error) {
        res.send("Error al cargar").status(500);
    }
}));
App.post("/api/query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hola");
    const resp = yield (0, db_js_1.default)({
        host: "localhost",
        "user": "root",
        password: ""
    });
    const data = yield resp.query(`SELECT TABLE_NAME,TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES`).then((rows) => rows[0]);
    console.log(data);
}));
// {
//     // Declaración de variables
//     const { Database, user, password,query, dbName, session }  = req.body 
//     const cookie = req.headers.cookie && cookieHelper(req.headers.cookie)
//     cookie ? cookie.Database = Database : false 
//     let info : Info = {database:"",dbs:[],result : [] };
//     try{
//         const resp = await db(cookie ? cookie : req.body)
//         const data = await resp.query<RowDataPacket[]>(`SELECT TABLE_NAME,TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES`).then((rows)=>rows[0]) as []
//         const dbs = await resp.query<RowDataPacket[]>(`SHOW DATABASES`).then((value)=>value[0]) as []
//         info.dbs = dbMapper(data,dbs)
//         // info.dbs = dbs.map((db: {Database: string, tables?: string[]}) => {
//         //     db.tables = data.filter((el: {TABLE_SCHEMA : string}) =>
//         //         el.TABLE_SCHEMA == db.Database
//         //     ).map((el: {TABLE_NAME : string})=>el.TABLE_NAME)})
//         // dbs.map((db : any)=> db.tables = data.filter((row: any)=>row.TABLE_SCHEMA == db.Database))
//         //Crear Cookie Si No Existe
//         //Si existe una consulta realizarla
//         if (query){
//             await resp.query(`USE \`${Database || "sys"}\` `)
//                 const result = await resp.query(query)
//                 info.result = result
//         }        
//         if (dbName){
//             console.log("Hola",dbName)
//             resp.query(`CREATE DATABASE ${dbName};`)
//         }
//     }catch(error ){
//         console.log('entro por acá',error)
//         res.render("login.ejs",{
//             title:"login",
//             info:info
//         })
//         console.log("acá",typeof(error))
//         // info.error = typeof(error) !== 'unknown' ? "chi" : error
// //         if (error.errno == 1045){
// //             res.clearCookie("user")
// // }
//     }
// })

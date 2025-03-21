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
const cookieHelper_js_1 = __importDefault(require("./helpers/cookieHelper.js"));
const dbMapper_js_1 = __importDefault(require("./helpers/dbMapper.js"));
const db_js_1 = __importDefault(require("./db.js"));
const Action = {
    setCookie: (data) => {
        express_1.default.response.cookie("user", data);
    },
    removeCookie: () => {
    }
};
const App = (0, express_1.default)();
App.use(express_1.default.urlencoded({ extended: true }));
App.set("view engine", "ejs");
App.set('views', "./dist/" + 'views');
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
App.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Declaración de variables
    const { Database, user, password, query, dbName } = req.body;
    const cookie = req.headers.cookie && (0, cookieHelper_js_1.default)(req.headers.cookie);
    cookie ? cookie.Database = Database : false;
    let info = { database: "", dbs: [], result: [] };
    if (req.body.session == "logout") {
        res.clearCookie("user");
    }
    try {
        const resp = yield (0, db_js_1.default)(cookie ? cookie : req.body);
        const data = yield resp.query(`SELECT TABLE_NAME,TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES`).then((rows) => rows[0]);
        const dbs = yield resp.query(`SHOW DATABASES`).then((value) => value[0]);
        info.dbs = (0, dbMapper_js_1.default)(data, dbs);
        // info.dbs = dbs.map((db: {Database: string, tables?: string[]}) => {
        //     db.tables = data.filter((el: {TABLE_SCHEMA : string}) =>
        //         el.TABLE_SCHEMA == db.Database
        //     ).map((el: {TABLE_NAME : string})=>el.TABLE_NAME)})
        // dbs.map((db : any)=> db.tables = data.filter((row: any)=>row.TABLE_SCHEMA == db.Database))
        //Crear Cookie Si No Existe
        if (!cookie) {
            console.log("no hay cookie");
            Action.setCookie({
                user: user,
                password: password,
            });
        }
        //----------------------
        //Si existe una consulta realizarla
        if (query) {
            yield resp.query(`USE \`${Database || "sys"}\` `);
            const result = yield resp.query(query);
            info.result = result;
        }
        if (dbName) {
            console.log("Hola", dbName);
            resp.query(`CREATE DATABASE ${dbName};`);
        }
    }
    catch (error) {
        console.log('entro por acá', error);
        res.render("login.ejs", {
            title: "login",
            info: info
        });
        console.log("acá", typeof (error));
        // info.error = typeof(error) !== 'unknown' ? "chi" : error
        //         if (error.errno == 1045){
        //             res.clearCookie("user")
        // }
    }
    res.render("home.ejs", {
        title: "home",
        info: info,
        session: cookie
    });
}));

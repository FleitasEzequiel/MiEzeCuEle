"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dbMapper(query, dbs) {
    dbs.map((db) => {
        db.tables = query.filter((el) => el.TABLE_SCHEMA == db.Database).map((el) => el.TABLE_NAME);
    });
    // (query[0] as []).map((el: any)=>(el.TABLE_SCHEMA == db.Database) && el.TABLE_NAME  ).filter(Boolean)
    // })
    // const yo = ((query)[0] as []).map((el: any)=>{
    //     console.log(Object.values(el))
    // })
    // new Array(query)[0].map((el : any)=>{
    //     const indice: number = dbs.findIndex((e : {'Database':string}) => e.Database == el.TABLE_SCHEMA);
    //     dbs[indice] = {
    //         Database: "nio",
    //         tables: []
    //     }
    //     !!dbs[indice].tables && console.log("chi")
    //     if(dbs[indice].tables){
    //         dbs[indice].tables.push(el.TABLE_NAME)
    //     }else{
    //         dbs[indice].tables = [el.TABLE_NAME]
    //     }
    return dbs;
}
exports.default = dbMapper;

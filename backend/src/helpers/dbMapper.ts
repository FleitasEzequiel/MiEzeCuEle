import { QueryResult, FieldPacket, RowDataPacket } from "mysql2";

function dbMapper(query: [QueryResult, FieldPacket[]] ,dbs: [RowDataPacket[], FieldPacket[]]) : {tables:string[],Database:string}[] {
    query[0].map((el : {TABLE_NAME : string, TABLE_SCHEMA : string})=>{
        const indice: number = dbs.findIndex((e : {'Database':string}) => e.Database == el.TABLE_SCHEMA);
        if(dbs[indice].tables){
            dbs[indice].tables.push(el.TABLE_NAME)
        }else{
            dbs[indice].tables = [el.TABLE_NAME]
        }
    })
    return dbs
}

export default dbMapper 
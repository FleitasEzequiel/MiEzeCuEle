function dbMapper(query,dbs) {
    query[0].map((el)=>{
        const indice = dbs.findIndex((e) => e.Database == el.TABLE_SCHEMA);
        if(dbs[indice].tables){
            dbs[indice].tables.push(el.TABLE_NAME)
        }else{
            dbs[indice].tables = [el.TABLE_NAME]
        }
    })
    console.log(dbs)
    return dbs
}

export default dbMapper
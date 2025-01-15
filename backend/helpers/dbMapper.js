function dbMapper(query) {
    let map = []
    query[0].map((el)=>{
        const indice = map.findIndex((e) => e.database == el.TABLE_SCHEMA);
        if (indice == -1){
            map.push({
                "database":el.TABLE_SCHEMA,
                "tables":[`${el.TABLE_NAME}`]
            })   
        }else{
            map[indice].tables.push(el.TABLE_NAME)
        }})
    return map
}

export default dbMapper
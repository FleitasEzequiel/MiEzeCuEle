"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dbMapper(query, dbs) {
    query[0].map((el) => {
        const indice = dbs.findIndex((e) => e.Database == el.TABLE_SCHEMA);
        if (dbs[indice].tables) {
            dbs[indice].tables.push(el.TABLE_NAME);
        }
        else {
            dbs[indice].tables = [el.TABLE_NAME];
        }
    });
    return dbs;
}
exports.default = dbMapper;

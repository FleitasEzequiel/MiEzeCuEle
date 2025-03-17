import { FieldPacket, QueryResult } from "mysql2"

type Consulta = { 
    db: string,
    query: string,
}

interface Info {
    database : string,
    dbs: any,
    error?: {
        errno: number
        error: string
    },
    result?: any
}
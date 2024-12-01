import mysql2 from "mysql2/promise"


const CreateConnection = async(data) =>{
    // const {host,user,password} = data 
    const Connection = await mysql2.createConnection({
        host:"localhost",
        user:"root",
        password:""
    })
    return Connection
}

export default CreateConnection
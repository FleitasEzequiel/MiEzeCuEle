import fc from "../helpers/functions.jsx"

const Query = () =>{
    return (
        <div className="query-form">
            <form action="" onSubmit={(e)=>{
                e.preventDefault()
                fc.Query({QUERY:"HOLA MAN CÒMO ESTÀS",PARAMS: "Yo"})
            }}>
                <textarea name="Query" id="" placeholder="Escribe tu consulta aqui"></textarea>
                <button className="query-button">Enviar</button>
            </form>
        </div>

    )
}

export default Query
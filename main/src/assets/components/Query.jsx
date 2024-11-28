

const Query = () =>{
    return (
        <div className="query-form">
            <form action="" onSubmit={(e)=>{
                e.preventDefault()
                e.bubbles = true
            }}>
                <textarea name="Query" id="" placeholder="Escribe tu consulta aqui"></textarea>
                <button className="query-button">Enviar</button>
            </form>
        </div>

    )
}

export default Query
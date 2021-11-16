function Form(){

    function cadastrarUsuario(e){
        e.preventDefault(); //impede o envio de requisição (Impede a página de recarregar)
        console.log("Cadastrou o Usuario")
    }

    return(
        <div>
            <h1>Cadastro:</h1>
            <form onSubmit={cadastrarUsuario}>
                <div>
                    <label htmlFor="name">Login:</label>
                    <input type="text" id="name" placeholder="Digite se nome" />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" placeholder="Digite se nome" />
                </div>
                <div>
                    <input type="submit" value="Cadastrar" />
                </div>
                
            </form>
        </div>
    )
}

export default Form
import { useState } from 'react'

function Form(){

    function cadastrarUsuario(e){
        e.preventDefault(); //impede o envio de requisição (Impede a página de recarregar)
        console.log(name)
       
        console.log(`Usuário ${name} foi cadastrado com a senha ${password}`)
    }

    const [name, setName] = useState()
    const [password, setPassword] = useState()

    return(
        <div>
            <h1>Cadastro:</h1>
            <form onSubmit={cadastrarUsuario}>
                <div>
                    <label htmlFor="name">Login:</label>
                    <input 
                    type="text" 
                    id="name" 
                    placeholder="Digite se nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" placeholder="Digite se nome" 
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div>
                    <input 
                    type="submit" 
                    value="Cadastrar" 
                    />
                </div>
                
            </form>
        </div>
    )
}

export default Form
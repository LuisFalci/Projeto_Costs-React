import {useState} from 'react'

function Condicional(){

    const [email, setEmail] = useState()
    const [userEmail, SetUserEmail] = useState()

    function enviarEmail(e){
        e.preventDefault();
        SetUserEmail(email)
        console.log(userEmail)
    }

    function limparEmail(){
        SetUserEmail('')
    }

    return(
        <div>
            <h2>Cadastre seu e-mail</h2>
            <form>
                <input 
                type="email" 
                placeholder="Digite se e-mail"
                onChange={(e) => setEmail(e.target.value)} />
                <button onClick={enviarEmail}>Enviar email</button>
                {userEmail && (
                    <div>
                        <p>O email do user é:{userEmail}</p>
                        <button onClick={limparEmail}>limpar Email</button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Condicional
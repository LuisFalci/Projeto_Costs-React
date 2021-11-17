import Button from "./evento/Button"

function Evento(){

    function meuEvento(){
        console.log('Fui ativado')
    }

    function segundoEvento(){
        console.log('Fui ativado 2')
    }

    return(
        <div>
            <p>Clique para rolar o evento</p>
            <Button event={meuEvento} text="Primeiro Evento" />
            <Button event={segundoEvento} text="Segundo Evento" />
            <button onClick={meuEvento}>Ativar</button>
        </div>
    )
}

export default Evento
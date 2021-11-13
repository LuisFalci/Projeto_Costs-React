function Pessoa(propriedade){
    return(
        <div>
            <img src={propriedade.foto} alt={propriedade.nome} />
            <h2>Nome: {propriedade.nome}</h2>
            <p>Idade: {propriedade.idade}</p>
            <p>Profissão: {propriedade.profissao}</p>
            
        </div>
    )
}

export default Pessoa
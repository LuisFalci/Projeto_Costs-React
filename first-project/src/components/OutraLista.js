function OutraLista({ itens }){
    return(
        <>
        <h3>Lista percorrida</h3>
        {/* {itens.map((item, ) => (
            <p>{item}</p> 
        ))} */}

        {itens.length > 0 ? ( //if
        itens.map((item, index) => (
            <p key={index}>{item}</p> //O key gera uma chave única (id) para cada elemento da lista
        ))) : ( //else
            <p>Não há itens na lista</p>
        )
        }
        </>
    )
} 

export default OutraLista
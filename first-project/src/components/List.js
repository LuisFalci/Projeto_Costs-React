import Item from "./Item"

function List(){
    return(
        <>
        <h1>Lista</h1>
        <ul>
            <Item marca="Honda" ano_lancamento={1986}/>
            <Item marca="Crown" ano_lancamento={1990}/>
            <Item marca="Mercedes" ano_lancamento={1995}/>
            <Item />
        </ul>   
        </>
    )
}

export default List
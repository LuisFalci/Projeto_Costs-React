function Button(props){
    return <button onClick={props.event}>{props.text}</button> 
    //quando retornamos apenas uma linha n precisamos usar parenteses
}

export default Button
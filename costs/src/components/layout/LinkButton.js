import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

function LinkButton({to, text}){
    return(
        // recebemos o local para onde o link vai da Home, além do nome(text) que o link terá
        <Link className={styles.btn} to={to}>
        {text}
        </Link>
    )
}

export default LinkButton
import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home(){
    return(
    <section className={styles.home_container}>
        <h1>Bem Vindo ao <span>Costs</span></h1>
        <p>Gerencie seus projetos</p>
        {/* passamos dinamicamente para o component LinkButton o local (to) e o texto que queremos */}
        <LinkButton to="/newproject" text="Criar Projeto" /> 
        <img src={savings} alt="Costs" srcset=""/>
    </section>
    
    )
}

export default Home